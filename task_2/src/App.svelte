<script lang="ts">
  import Converter from './lib/Converter.svelte'
</script>

<main>
  <h1>Currency converter</h1>

  <div class="card">
    <Converter />
  </div>

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>
