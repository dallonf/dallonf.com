<script lang="ts">
  import "@fontsource/public-sans";

  import type { Snippet } from "svelte";

  interface Props {
    year: string;
    title: string;
    employer: string;
    logo?: string | undefined;
    children: Snippet;
  }

  let { year, title, employer, logo, children }: Props = $props();
</script>

<li class="role">
  <div class="year" aria-label="Year">{year}</div>
  <h3 class="title">{title}</h3>
  <div class="employer" aria-label="Employer">{employer}</div>
  {#if logo}
    <img class="logo" src={logo} width={50} height={50} alt="" />
  {/if}
  <p>{@render children()}</p>
</li>

<style>
  .role {
    display: grid;
    grid:
      "year title logo"
      "year employer logo"
      "year description description" / var(--size-fluid-6) 1fr;
  }

  .year {
    grid-area: year;
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
