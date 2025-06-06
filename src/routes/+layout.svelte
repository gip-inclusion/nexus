<script lang="ts">
    
    import '../app.css';

    import { onMount } from 'svelte';

    onMount(() => {
		import('@gouvfr/dsfr/dist/dsfr/dsfr.module.min.js');
		import('@gouvfr/dsfr/dist/dsfr/dsfr.nomodule.min.js');
	});

	let { children } = $props();

</script>

{@render children()}
