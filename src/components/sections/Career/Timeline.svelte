<script lang="ts">
  import { onMount } from "svelte";
  import { Timeline, type DataItemCollectionType } from "vis-timeline";

  interface Props {
    events: DataItemCollectionType;
  }

  const { events }: Props = $props();

  let container = $state<HTMLDivElement>();
  let timeline = $state<Timeline>();

  onMount(() => {
    timeline = new Timeline(container!, events, {});
  });

  $effect(() => {
    timeline?.setItems(events);
  });
</script>

<div bind:this={container}></div>
