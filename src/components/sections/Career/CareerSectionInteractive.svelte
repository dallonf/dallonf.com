<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import type { DataItemCollectionType } from "vis-timeline";
  import { Temporal } from "temporal-polyfill";
  import Timeline from "./Timeline.svelte";
  import Role from "./Role.svelte";
  import "vis-timeline/styles/vis-timeline-graph2d.min.css";

  const a11yId = $props.id();

  interface Props {
    jobs: CollectionEntry<"jobs">[];
  }

  let { jobs }: Props = $props();

  let timelineLoaded = $state(false);
  let selectedEventId: string = $state("2022-sibi");

  let jobsInOrder = $derived(
    jobs
      .toSorted((a, b) => {
        const aStart = Temporal.PlainYearMonth.from(a.data.start);
        const bStart = Temporal.PlainYearMonth.from(b.data.start);
        return Temporal.PlainYearMonth.compare(aStart, bStart);
      })
      .toReversed()
  );
  let currentJobIndex = $derived(
    jobsInOrder.findIndex((it) => it.id === selectedEventId)
  );

  let events: DataItemCollectionType = $derived(
    jobs.map((job) => ({
      id: job.id,
      content: job.data.name,
      start: job.data.start.toString(),
    }))
  );

  function previousJob() {
    const prevJob = jobsInOrder[currentJobIndex + 1];
    if (prevJob) {
      selectedEventId = prevJob.id;
    }
  }

  function nextJob() {
    const nextJob = jobsInOrder[currentJobIndex - 1];
    if (nextJob) {
      selectedEventId = nextJob.id;
    }
  }
</script>

<div class="layout">
  <h2>Career History</h2>
  <div class="timeline-container">
    <Timeline
      {events}
      bind:selectedEventId
      onLoaded={() => {
        timelineLoaded = true;
      }}
    />
  </div>
  <div
    class={[
      "description-container",
      {
        "show-single": timelineLoaded,
      },
    ]}
  >
    {#each jobsInOrder as job (job.id)}
      {@const headerId = `job-${job.id}-${a11yId}`}
      <div
        role="region"
        class="job"
        hidden={timelineLoaded && selectedEventId !== job.id}
        aria-labelledby={headerId}
      >
        <Role
          title={job.data.title}
          employer={job.data.name}
          start={Temporal.PlainYearMonth.from(job.data.start)}
          end={job.data.end != null
            ? Temporal.PlainYearMonth.from(job.data.end)
            : undefined}
          logo={job.data.logo?.src}
        >
          {@html job.rendered?.html}
        </Role>
      </div>
    {/each}
  </div>
  {#if timelineLoaded}
    <div class="controls-container">
      <button class="prev-btn" onclick={previousJob}>Previous</button>
      <button class="next-btn" onclick={nextJob}>Next</button>
    </div>
  {/if}
</div>

<style>
  .layout {
    flex: 1;
    align-self: stretch;
    padding-left: var(--size-fluid-2);
    padding-right: var(--size-fluid-2);
    padding-top: var(--size-fluid-2);
    padding-bottom: var(--size-fluid-2);
  }

  h2 {
    font-family: var(--accent-font);
    font-weight: bold;
    font-size: var(--font-size-fluid-2);
    margin-bottom: var(--size-fluid-2);
  }

  .timeline-container {
    margin-bottom: var(--size-fluid-2);
  }

  .description-container {
    display: flex;
    flex-direction: column;
    gap: var(--size-fluid-3);
    &.show-single {
      display: grid;

      > .job {
        grid-row: 1;
        grid-column: 1;
      }

      > .job[hidden] {
        display: block;
        visibility: hidden;
      }
    }
  }

  .controls-container {
    margin-top: var(--size-fluid-2);
    display: flex;
    justify-content: space-between;
  }

  .controls-container > button {
    background: var(--color-bg-darkish);
    color: var(--color-text-light);
    border: none;
    text-transform: uppercase;
    font-size: var(--font-size-fluid-0);
    padding: var(--size-1);
    cursor: pointer;
    width: var(--size-fluid-7);
  }

  .prev-btn {
    text-align: left;
  }

  .next-btn {
    text-align: right;
  }

  @media (--md-n-above) {
    .layout {
      max-inline-size: var(--max-section-width);
      align-self: center;
      display: grid;
      grid-template-areas: "heading jobs" ". controls" "timeline timeline";
      grid-template-columns: 50% 50%;
      grid-template-rows: auto auto auto 1fr;
    }

    h2 {
      grid-area: heading;
    }

    .description-container {
      grid-area: jobs;
    }

    .controls-container {
      grid-area: controls;
    }

    .timeline-container {
      margin-top: var(--size-fluid-4);
      grid-area: timeline;
    }
  }
</style>
