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
  import Timeline from "./Timeline.svelte";
  import type { DataItemCollectionType } from "vis-timeline";

  const a11yId = nextA11yId();

  interface Props {
    jobs: CollectionEntry<"jobs">[];
  }

  let { jobs }: Props = $props();

  let events: DataItemCollectionType = $derived(
    jobs.map((job) => ({
      id: job.id,
      content: job.data.name,
      start: job.data.start,
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
        <h3 id={headerId}>{job.data.name}</h3>
        {#if job.data.title}<div>{job.data.title}</div>{/if}
        {@html job.rendered?.html}
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
