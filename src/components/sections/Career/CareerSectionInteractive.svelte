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

  let selectedEventId: string | undefined = $state("2022-sibi");
</script>

<Timeline {events} bind:selectedEventId />
<div>
  {#each jobs as job (job.id)}
    {@const headerId = `job-${job.id}-${a11yId}`}
    <div
      role="region"
      hidden={selectedEventId !== job.id}
      aria-labelledby={headerId}
    >
      <h2 id={headerId}>{job.data.name}</h2>
      {#if job.data.title}<div>{job.data.title}</div>{/if}
      {@html job.rendered?.html}
    </div>
  {/each}
</div>
