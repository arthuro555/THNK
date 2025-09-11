<script lang="ts">
  import { fade, scale } from "svelte/transition";
  export let open = true;
</script>

{#if open}
  <div transition:fade class="blur" />
  <div transition:scale={{ duration: 250, start: 0.45 }} class="frame">
    <slot />
  </div>
{/if}

<style>
  .blur {
    backdrop-filter: blur(4px);

    position: absolute;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
  }

  .frame {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    position: absolute;
    top: 0;
    left: 0;
    width: calc(100dvw - 24px);
    height: calc(100dvh - 24px);
    margin: 12px;
    border-radius: 40px;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: rgba(33, 37, 41, 0.96);

    text-align: center;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
