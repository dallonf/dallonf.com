<script lang="ts">
  import { onMount } from "svelte";
  import { Temporal } from "temporal-polyfill";
  import { Timeline } from "vis-timeline";

  let container = $state<HTMLDivElement | null>();
  let timeline = $state<Timeline | null>();

  onMount(() => {
    const today = Temporal.Now.plainDateISO();

    console.log({ today, container });

    timeline = new Timeline(
      container!,
      [
        { content: "Sibi", start: "2022-09-01", end: today.toString() },
        {
          content: "Volusion",
          start: "2020-11-01",
          end: "2022-06-01",
        },
        {
          content: "RigUp",
          start: "2019-06-01",
          end: "2020-01-01",
        },
        {
          content: "Phunware",
          start: "2016-06-01",
          end: "2019-04-01",
        },
        {
          content: "Nuve",
          start: "2015-08-01",
          end: "2016-05-01",
        },
      ],
      {}
    );
  });
</script>

<div bind:this={container}></div>
