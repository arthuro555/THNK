<script>
  import Backdrop from "./lib/Backdrop.svelte";
  let open = true;
  let input_methods = [];
</script>

<Backdrop {open}>
  <h1>Input Selection</h1>
  <div class="inputs">
    {#if input_methods.length === 0}
      <span>Press any keyboard key or gamepad to select your input method</span>
    {:else}
      <span>ass</span>
    {/if}
  </div>
</Backdrop>

<button
  class="button"
  on:click={() => {
    open = !open;
  }}>Ass</button
>

<style>
  .button {
    color: grey;
    position: absolute;
    top: 0;
    left: 0;
    width: 6vw;
    height: 3vh;
  }

  .inputs {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 75%;
    width: 60%;
    margin: 5% 20% 0 20%;

    /*background-color: blue;*/
  }
</style>
