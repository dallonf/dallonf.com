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
  }

  let { events, selectedEventId = $bindable() }: Props = $props();

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
