<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { Temporal } from "temporal-polyfill";
  import Timeline from "./Timeline.svelte";
  import type { DataItemCollectionType } from "vis-timeline";

  interface Props {
    jobs: CollectionEntry<"jobs">[];
  }

  let { jobs }: Props = $props();

  const today = Temporal.Now.plainDateISO();

  let events: DataItemCollectionType = $derived(
    jobs.map((job) => ({
      id: job.id,
      content: job.data.name,
      start: job.data.start,
      end: job.data.end ?? today.toString(),
    }))
  );

  let selectedEventId: string | undefined = $state("2022-sibi");

  let selectedEvent = $derived(
    selectedEventId ? jobs.find((it) => it.id === selectedEventId) : undefined
  );
</script>

<Timeline {events} bind:selectedEventId />
{#if selectedEvent}
  <div>
    <h2>{selectedEvent.data.name}</h2>
    {#if selectedEvent.data.title}<div>{selectedEvent.data.title}</div>{/if}
    {@html selectedEvent.rendered?.html}
  </div>
{/if}
