<script lang="ts">
  import "@fontsource/public-sans";

  import type { Snippet } from "svelte";
  import { type Temporal } from "temporal-polyfill";

  interface Props {
    start: Temporal.PlainYearMonth;
    end?: Temporal.PlainYearMonth | undefined;
    title: string;
    employer: string;
    logo?: string | undefined;
    children: Snippet;
  }

  let { start, end, title, employer, logo, children }: Props = $props();

  function monthName(month: number) {
    switch (month) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        throw new Error(`tried to get the name of the ${month}th month`);
    }
  }

  function formatMonthYear(monthYear: Temporal.PlainYearMonth) {
    return `${monthName(monthYear.month)} ${monthYear.year}`;
  }
</script>

<li class="role">
  <div class="when" aria-label="When">
    {formatMonthYear(start)}
    -
    {#if end}{formatMonthYear(end)}{:else}Present{/if}
  </div>
  <h3 class="title">{title}</h3>
  <div class="employer" aria-label="Employer">
    {employer}
  </div>
  {#if logo}
    <img class="logo" src={logo} width={50} height={50} alt="" />
  {/if}
  <p>{@render children()}</p>
</li>

<style>
  .role {
    display: grid;
    grid:
      "when title logo"
      "when employer logo"
      "when description description" / var(--size-fluid-6) 1fr;
  }

  .when {
    grid-area: when;
    font-family: "Public Sans", system-ui, sans-serif;
    font-weight: bold;
  }

  .title {
    grid-area: title;
    text-transform: uppercase;
    font-weight: bold;
  }

  .employer {
    grid-area: employer;
    font-size: var(--font-size-0);
    text-transform: uppercase;
  }

  .logo {
    grid-area: logo;
    margin-left: var(--size-fluid-1);
  }

  p {
    grid-area: description;
    font-size: var(--font-size-0);
    margin-top: var(--size-fluid-2);
  }
</style>
