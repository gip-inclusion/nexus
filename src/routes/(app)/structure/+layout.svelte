<script lang="ts">
	import { page } from '$app/state';

	const pathname = $derived(() => page.url.pathname);

	let { children } = $props();
</script>

<header class="p-8">
	<h1 class="text-3xl font-bold">Structure</h1>

	<nav class="mt-4 flex space-x-4 text-sm font-medium">
		<a
			href="/structure"
			class="border-b-2 pb-1 transition-colors duration-200
            {pathname() === '/structure'
				? 'border-blue-600 text-blue-600'
				: 'border-transparent text-gray-500 hover:text-gray-700'}"
		>
			Vue d’ensemble
		</a>

		<a
			href="/structure/offres"
			class="border-b-2 pb-1 transition-colors duration-200
            {pathname().startsWith('/structure/offres')
				? 'border-blue-600 text-blue-600'
				: 'border-transparent text-gray-500 hover:text-gray-700'}"
		>
			Offres d'emplois
		</a>

		<a
			href="/structure/services"
			class="border-b-2 pb-1 transition-colors duration-200
            {pathname().startsWith('/structure/services')
				? 'border-blue-600 text-blue-600'
				: 'border-transparent text-gray-500 hover:text-gray-700'}"
		>
			Services d'insertion
		</a>

		<a
			href="/structure/opportunites"
			class="border-b-2 pb-1 transition-colors duration-200
            {pathname().startsWith('/structure/opportunites')
				? 'border-blue-600 text-blue-600'
				: 'border-transparent text-gray-500 hover:text-gray-700'}"
		>
			Opportunités commerciales
		</a>
	</nav>
</header>

<div class="px-8">
	{@render children()}
</div>
