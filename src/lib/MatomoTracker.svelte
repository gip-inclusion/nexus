<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	const MATOMO_URL = 'https://matomo.inclusion.beta.gouv.fr';
	const CONTAINER_ID = 'CpNnRZfO';

	onMount(() => {
		// Initialisation du tableau _mtm
		const _mtm = (window._mtm = window._mtm || []);
		_mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });

		// Injection du script Matomo Tag Manager
		const script = document.createElement('script');
		script.async = true;
		script.src = `${MATOMO_URL}/js/container_${CONTAINER_ID}.js`;
		document.head.appendChild(script);

		// Suivi des changements de page SPA
		afterNavigate(() => {
			setTimeout(() => {
				window._paq?.push({ event: 'mtm.PageView' });
				console.log('[Matomo] mtm.PageView envoyé');
			}, 300);
		});
	});
</script>