<script lang="ts">
	import { page } from '$app/state';

	const pathname = $derived(() => page.url.pathname);

	let { children } = $props();
</script>

<header class="px-8 py-6">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold text-black">Structure</h1>
		<button
			class="flex items-center gap-2 rounded-lg bg-[#1E1E9E] px-4 py-2 text-white hover:bg-[#1a1a8a]"
		>
			<i class="ri-external-link-line"></i>
			Créer votre site internet
		</button>
	</div>

	<nav class="mt-8 flex space-x-8 border-b border-gray-200 text-base">
		<a
			href="/structure"
			class="-mb-px border-b-2 pb-2 transition-colors duration-200
            {pathname() === '/structure'
				? 'border-[#1E1E9E] font-medium text-[#1E1E9E]'
				: 'border-transparent text-gray-600 hover:text-gray-800'}"
		>
			Vue d'ensemble
		</a>

		<a
			href="/structure/offres-emplois"
			class="-mb-px border-b-2 pb-2 transition-colors duration-200
            {pathname().startsWith('/structure/offres')
				? 'border-[#1E1E9E] font-medium text-[#1E1E9E]'
				: 'border-transparent text-gray-600 hover:text-gray-800'}"
		>
			Offres d'emplois
		</a>

		<a
			href="/structure/services-insertion"
			class="-mb-px border-b-2 pb-2 transition-colors duration-200
            {pathname().startsWith('/structure/services')
				? 'border-[#1E1E9E] font-medium text-[#1E1E9E]'
				: 'border-transparent text-gray-600 hover:text-gray-800'}"
		>
			Services d'insertion
		</a>

		<a
			href="/structure/opportunites-commerciales"
			class="-mb-px border-b-2 pb-2 transition-colors duration-200
            {pathname().startsWith('/structure/conventions')
				? 'border-[#1E1E9E] font-medium text-[#1E1E9E]'
				: 'border-transparent text-gray-600 hover:text-gray-800'}"
		>
		Opportunités commerciales
		</a>
	</nav>
</header>

<div class="px-8">
	{@render children()}
</div>
