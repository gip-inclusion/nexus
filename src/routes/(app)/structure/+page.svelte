<script lang="ts">
	import showdown from 'showdown';

	export let data;

	const structure = data.structure;
	const { stats } = data;

	const formatDate = (dateString: string) => {
		if (!dateString) return '-';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('fr-FR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return dateString;
		}
	};

	import ModuleCardEmplois from '$lib/components/ModuleCardEmplois.svelte';
	import ModuleCardServicesInsertion from '$lib/components/ModuleCardServicesInsertion.svelte';
	import ModuleCardOpportunitesCommerciales from '$lib/components/ModuleCardOpportunitesCommerciales.svelte';

	const converter = new showdown.Converter();

	const presentationHtml = converter.makeHtml(structure.presentation || '');
</script>

<div>
	<h2 class="mb-4 inline-block p-1 text-2xl font-semibold">Vue d'ensemble</h2>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<section class="flex flex-col rounded-lg border border-gray-200 bg-white p-6">
			<div class="mb-8">
				<h2 class="mb-4 text-base font-semibold">Mes app’s</h2>
				<ModuleCardEmplois activeJobs={stats.activeJobs} inactiveJobs={stats.inactiveJobs}/>
				<ModuleCardServicesInsertion activeServices={stats.activeServices} />
				<ModuleCardOpportunitesCommerciales activeOpportunities={stats.activeOpportunities} />
			</div>
			<!--
			<div>
				<h2 class="mb-4 text-base font-semibold">Ajoutez de nouvelles app’s</h2>
				<p>TODO</p>
			</div>
			-->
		</section>

	<!-- Description et coordonnées -->
	<section class="flex flex-col rounded-lg border border-gray-200 bg-white p-6">
		<!-- Title -->
		<div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
			<div class="flex-grow">
				<h2 class="text-base font-semibold">Description et coordonnées</h2>
			    {#if structure.edited_at}
					<div class="mr-4 text-sm text-gray-500">dernière mise à jour le {formatDate(structure.edited_at)}</div>
				{/if}
			</div>
			<div class="flex items-center justify-end gap-4 text-xs text-gray-500 italic">
				<button
					class="rounded border border-blue-600 bg-white px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
					>Modifier</button
				>
			</div>
		</div>
			<!-- Structure contact panel -->
			<div class="mb-4 rounded-lg border border-gray-200 p-4">
				<div class="mb-4 flex items-center">
					<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#F6F8FF]">
						<i class="ri-community-line text-xl text-blue-600"></i>
					</div>
					<div>
						{#if structure.type}
							<p class="text-sm font-semibold">{structure.type}</p>
						{/if}
						<p class="text-lg font-bold">{structure.name || '-'}</p>
					</div>
				</div>
				<hr class="mb-4 border-gray-200" />
				<p class="mb-2 flex items-center text-sm">
					<i class="ri-map-pin-2-line mr-1 text-gray-600"></i>
					{structure.address || '-'}
				</p>
				<p class="mb-2 flex items-center text-sm text-blue-600">
					<i class="ri-mail-line mr-1 text-gray-600"></i>
					<a href={'mailto:' + structure.email}>{structure.email || '-'}</a>
				</p>
				<p class="mb-2 flex items-center text-sm">
					<i class="ri-phone-line mr-1 text-gray-600"></i>
					{structure.phone || '-'}
				</p>
				<p class="flex items-center text-sm text-blue-600">
					<i class="ri-global-line mr-1 text-gray-600"></i>
					<a href={structure.website} target="_blank" rel="noopener noreferrer">
						{structure.website || '-'}
					</a>
				</p>
			</div>
			<!-- Presentation -->
			<div class="text-sm leading-relaxed text-gray-700">
				{@html presentationHtml}
			</div>
		</section>
	</div>
</div>


								
