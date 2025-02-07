<script lang="ts">
  import { Temporal } from "temporal-polyfill";
  import Timeline from "./Timeline.svelte";

  const today = Temporal.Now.plainDateISO();
</script>

<Timeline
  events={[
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
  ]}
/>
