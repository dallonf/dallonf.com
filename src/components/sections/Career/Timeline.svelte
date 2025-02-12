<script lang="ts">
  import { onMount } from "svelte";
  import {
    Timeline,
    type DataItemCollectionType,
    type IdType,
  } from "vis-timeline";

  interface Props {
    events: DataItemCollectionType;
    selectedEventId?: string | undefined;
  }

  let { events, selectedEventId = $bindable() }: Props = $props();

  let container = $state<HTMLDivElement>();
  let timeline = $state<Timeline>();

  onMount(() => {
    timeline = new Timeline(container!, events, {});

    const handleSelect = ({ items }: { items: IdType[] }) => {
      selectedEventId = items[0] as string | undefined;
    };
    timeline.on("select", handleSelect);

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

<div bind:this={container}></div>
