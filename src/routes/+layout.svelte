<script lang="ts">
    
    import '../app.css';

  import '@gouvfr/dsfr/dist/dsfr.min.css';
  import '@gouvfr/dsfr/dist/utility/utility.min.css';

  import { onMount } from 'svelte';

  onMount(async () => {
    await import('@gouvfr/dsfr/dist/dsfr.module.min.js');

    if (typeof window !== 'undefined' && window.dsfr) {
      console.log('DSFR JavaScript loaded successfully!');
    }
  });
  
  let { children } = $props();

</script>

<svelte:head>
  <link rel="preload" href="/fonts/Marianne-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  <link rel="preload" href="/fonts/Marianne-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous">
</svelte:head>

{@render children()}

<style>
  :global(body) {
    font-family: "Marianne", Arial, sans-serif;
  }
</style>