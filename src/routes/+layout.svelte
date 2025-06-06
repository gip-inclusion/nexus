<script lang="ts">
    
	import '../app.css';
  
  	let { children } = $props();

</script>

<svelte:head>
  <link rel="preload" href="/fonts/Marianne-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  <link rel="preload" href="/fonts/Marianne-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous">
</svelte:head>

{@render children()}
