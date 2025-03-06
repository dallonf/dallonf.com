<script lang="ts">
  import { onMount } from "svelte";
  import {
    Timeline,
    type DataItemCollectionType,
    type IdType,
  } from "vis-timeline";

  interface Props {
    events: DataItemCollectionType;
    selectedEventId: string;
    onLoaded: () => void;
  }

  let { events, selectedEventId = $bindable(), onLoaded }: Props = $props();

  let container = $state<HTMLDivElement>();
  let timeline = $state<Timeline>();

  onMount(() => {
    timeline = new Timeline(container!, events, {
      end: new Date(),
      max: new Date(),
      min: new Date("2008-01-01"),
      minHeight: "140px",
    });

    const handleSelect = ({ items }: { items: IdType[] }) => {
      if (items.length > 0) {
        selectedEventId = items[0] as string;
      } else {
        timeline?.setSelection(selectedEventId);
      }
    };
    timeline.on("select", handleSelect);

    onLoaded();

    return () => {
      timeline?.off("select", handleSelect);
    };
  });

  $effect(() => {
    timeline?.setItems(events);
  });

  $effect(() => {
    if (selectedEventId) {
      timeline?.setSelection(selectedEventId);
    } else {
      timeline?.setSelection([]);
    }
  });
</script>

<div class="timeline" bind:this={container}></div>

<style>
  .timeline {
    :global(.vis-timeline) {
      border: none;
    }

    :global(.vis-item) {
      background-color: var(--color-bg-tan);
      border-color: var(--color-bg-tan);
    }

    :global(.vis-item.vis-selected) {
      background-color: var(--color-bg-blue);
      border-color: var(--color-bg-blue);
      color: var(--color-text-light);
    }

    :global(.vis-item.vis-box) {
      border-radius: 0;
      padding-left: var(--size-1);
      padding-right: var(--size-1);
    }

    :global(.vis-line) {
      border-left-width: 2px;
    }
  }
</style>
