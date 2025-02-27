<script lang="ts" module>
  import { untrack } from "svelte";
  let prevId = $state(0);

  function nextA11yId() {
    return untrack(() => {
      prevId += 1;
      return prevId;
    });
  }
</script>

<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import type { DataItemCollectionType } from "vis-timeline";
  import { Temporal } from "temporal-polyfill";
  import Timeline from "./Timeline.svelte";
  import Role from "./Role.svelte";

  const a11yId = nextA11yId();

  interface Props {
    jobs: CollectionEntry<"jobs">[];
  }

  let { jobs }: Props = $props();

  let events: DataItemCollectionType = $derived(
    jobs.map((job) => ({
      id: job.id,
      content: job.data.name,
      start: job.data.start.toString(),
    }))
  );

  let selectedEventId: string = $state("2022-sibi");
</script>

<div class="layout">
  <h2>Career History</h2>
  <div class="timeline-container">
    <Timeline {events} bind:selectedEventId />
  </div>
  <div class="description-container">
    {#each jobs as job (job.id)}
      {@const headerId = `job-${job.id}-${a11yId}`}
      <div
        role="region"
        hidden={selectedEventId !== job.id}
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
</style>
