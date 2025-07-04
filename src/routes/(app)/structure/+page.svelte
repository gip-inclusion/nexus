<script lang="ts">
	import showdown from 'showdown';
	import { ModuleName, isActiveModule } from '$lib/module.js';
	import ModuleCardEmplois from '$lib/components/ModuleCardEmplois.svelte';
	import ModuleCardDora from '$lib/components/ModuleCardDora.svelte';
	import ModuleCardMarche from '$lib/components/ModuleCardMarche.svelte';
	import ModuleCardMonRecap from '$lib/components/ModuleCardMonRecap.svelte';
	import ModuleCardImmersionFacilitee from '$lib/components/ModuleCardImmersionFacilitee.svelte';
	import ModuleCardRdvInsertion from '$lib/components/ModuleCardRdvInsertion.svelte';
	import ModuleCardGps from '$lib/components/ModuleCardGps.svelte';
	import ModuleCardPilotage from '$lib/components/ModuleCardPilotage.svelte';
	import ModuleCardCommunaute from '$lib/components/ModuleCardCommunaute.svelte';

	let { data } = $props();

	const { structure, stats } = data;

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

	const converter = new showdown.Converter();
	const presentationHtml = converter.makeHtml(structure.presentation || '');

	async function activateModule(moduleKey: ModuleName) {
		if (!structure || !structure.id) {
			return;
		}
		try {
			const response = await fetch('/api/structures/modules', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ moduleKey })
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Erreur lors de l'activation du module");
			}
			
			// Ici, on forece le rafraîchissement total de la page / application pour s'assurer de n'avoir aucun état intermédiaire incohérent
			// d'autant plus qu'il faut gérer la navigation dans la sidebar ou dans la tabbar de la page /structure
			window.location.reload();

		} catch (error) {
			console.error(`❌ Erreur lors de l'activation du module ${moduleKey}:`, error);
		}
	}

	const allModules = [
		{
			key: ModuleName.Communaute,
			component: ModuleCardCommunaute,
			props: {},
			onActivate: () => activateModule(ModuleName.Communaute)
		},
		{
			key: ModuleName.Dora,
			component: ModuleCardDora,
			props: { activeServices: stats.activeServices },
			onActivate: () => activateModule(ModuleName.Dora)
		},
		{
			key: ModuleName.Emplois,
			component: ModuleCardEmplois,
			props: { activeJobs: stats.activeJobs, inactiveJobs: stats.inactiveJobs },
			onActivate: () => activateModule(ModuleName.Emplois)
		},
		{
			key: ModuleName.Gps,
			component: ModuleCardGps,
			props: {},
			onActivate: () => activateModule(ModuleName.Gps)
		},
		{
			key: ModuleName.ImmersionFacilitee,
			component: ModuleCardImmersionFacilitee,
			props: {},
			onActivate: () => activateModule(ModuleName.ImmersionFacilitee)
		},
		{
			key: ModuleName.Marche,
			component: ModuleCardMarche,
			props: { activeOpportunities: stats.activeOpportunities },
			onActivate: () => activateModule(ModuleName.Marche)
		},
		{
			key: ModuleName.MonRecap,
			component: ModuleCardMonRecap,
			props: {},
			onActivate: () => activateModule(ModuleName.MonRecap)
		},
		{
			key: ModuleName.Pilotage,
			component: ModuleCardPilotage,
			props: {},
			onActivate: () => activateModule(ModuleName.Pilotage)
		},
		{
			key: ModuleName.RdvInsertion,
			component: ModuleCardRdvInsertion,
			props: {},
			onActivate: () => activateModule(ModuleName.RdvInsertion)
		}
	];

	let activeModules = $derived.by(() => {
		const result = allModules.filter((module) => isActiveModule(module.key, structure.modules));
		return result;
	});
	let inactiveModules = $derived.by(() => {
		const result = allModules.filter((module) => !isActiveModule(module.key, structure.modules));
		return result;
	});
</script>

<div>
	<h2 class="mb-4 inline-block p-1 text-2xl font-semibold">Vue d'ensemble</h2>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<section class="flex flex-col rounded-lg border border-gray-200 bg-white p-6">
			<div class="mb-8">
				<h2 class="mb-4 text-base font-semibold">Mes app's</h2>
				{#each activeModules as module (module.key)}
					{@const Component = module.component}
					<Component isActive={true} {...module.props} />
				{/each}
			</div>
			<div>
				<h2 class="mb-4 text-base font-semibold">Ajoutez de nouvelles app's</h2>
				{#each inactiveModules as module (module.key)}
					{@const Component = module.component}
					<Component isActive={false} {...module.props} onActivate={module.onActivate} />
				{/each}
			</div>
		</section>

		<!-- Description et coordonnées -->
		<section class="flex flex-col rounded-lg border border-gray-200 bg-white p-6">
			<!-- Title -->
			<div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
				<div class="flex-grow">
					<h2 class="text-base font-semibold">Description et coordonnées</h2>
					{#if structure.edited_at}
						<div class="mr-4 text-sm text-gray-500">
							dernière mise à jour le {formatDate(structure.edited_at)}
						</div>
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
