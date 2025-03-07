<script lang="ts">
  import "@fontsource/public-sans";

  import type { Snippet } from "svelte";
  import { type Temporal } from "temporal-polyfill";
  import RichText from "@components/RichText.svelte";

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
  <h3 class="title">{title}</h3>
  <div class="subheading">
    <div class="employer" aria-label="Employer">
      {employer}
    </div>
    <div>&dot;</div>
    <div class="when" aria-label="When">
      {formatMonthYear(start)}
      -
      {#if end}{formatMonthYear(end)}{:else}Present{/if}
    </div>
  </div>
  {#if logo}
    <img class="logo" src={logo} width={50} height={50} alt="" />
  {/if}
  <div class="description"><RichText>{@render children()}</RichText></div>
</li>

<style>
  .role {
    display: grid;
    grid:
      "title logo"
      "subheading logo"
      "description description" / 1fr;
  }

  .title {
    grid-area: title;
    text-transform: uppercase;
    font-weight: bold;
  }

  .subheading {
    grid-area: subheading;
    display: flex;
    gap: var(--size-fluid-1);
  }

  .employer,
  .when {
    font-size: var(--font-size-0);
    text-transform: uppercase;
  }

  .logo {
    grid-area: logo;
    margin-left: var(--size-fluid-1);
  }

  .description {
    grid-area: description;
    font-size: var(--font-size-0);
    margin-top: var(--size-fluid-2);
  }
</style>
