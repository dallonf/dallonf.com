<script lang="ts">
  import type { Snippet } from "svelte";

  const {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<div class="rich-text">
  {@render children()}
</div>

<style>
  .rich-text {
    line-height: var(--font-lineheight-1);

    :global(li) {
      list-style: disc;
      margin-left: var(--size-fluid-1);
      margin-bottom: var(--size-fluid-1);
    }

    :global(p) {
      margin-bottom: var(--size-fluid-1);
    }
  }
</style>
