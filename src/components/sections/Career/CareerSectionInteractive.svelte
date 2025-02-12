<script lang="ts">
  import { Temporal } from "temporal-polyfill";
  import Timeline from "./Timeline.svelte";

  const today = Temporal.Now.plainDateISO();

  const events = [
    { id: "sibi", content: "Sibi", start: "2022-09-01", end: today.toString() },
    {
      id: "volusion",
      content: "Volusion",
      start: "2020-11-01",
      end: "2022-06-01",
    },
    {
      id: "rigup",
      content: "RigUp",
      start: "2019-06-01",
      end: "2020-01-01",
    },
    {
      id: "phunware",
      content: "Phunware",
      start: "2016-06-01",
      end: "2019-04-01",
    },
    {
      id: "nuve",
      content: "Nuve",
      start: "2015-08-01",
      end: "2016-05-01",
    },
  ];

  let selectedEventId: string | undefined = $state("sibi");

  let selectedEvent = $derived(
    selectedEventId ? events.find((it) => it.id === selectedEventId) : undefined
  );
</script>

<Timeline {events} bind:selectedEventId />
{selectedEvent?.content}
