<script lang="ts">
	let { data } = $props();
	const services = data.services || [];

	let openDropdowns = $state(new Set());

	function toggleDropdown(serviceId: number) {
		if (openDropdowns.has(serviceId)) {
			openDropdowns.delete(serviceId);
		} else {
			openDropdowns.add(serviceId);
		}
		openDropdowns = new Set(openDropdowns);
	}

	function handleAddService() {
		// Handle add service action
		console.log('Add service clicked');
	}
</script>

<div class="py-6">
	<!-- Header with title and add button -->
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-[#000638]">Services d'insertion</h1>
	</div>

	<!-- Services grid -->
	{#if services.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each services as service (service.id)}
				<div class="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<!-- Status dropdown -->
					<div class="relative mb-4">
						<button
							onclick={() => toggleDropdown(service.id)}
							class="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#000638] transition-colors hover:bg-blue-100"
						>
							<i class="ri-global-line text-blue-600"></i>
							{service.status}
							<i class="ri-arrow-down-s-line text-gray-400"></i>
						</button>

						{#if openDropdowns.has(service.id)}
							<div
								class="absolute top-full left-0 z-20 mt-1 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
							>
								<button class="w-full px-3 py-2 text-left text-sm text-[#000638] hover:bg-gray-50">
									<i class="ri-global-line mr-2 text-blue-600"></i>
									PUBLIÉE
								</button>
								<button class="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">
									<i class="ri-eye-off-line mr-2 text-gray-400"></i>
									BROUILLON
								</button>
							</div>
						{/if}
					</div>

					<!-- Service title -->
					<h3 class="mb-2 text-lg font-semibold text-[#000638]">{service.name}</h3>

					<!-- Perimeter -->
					<p class="mb-6 text-sm text-gray-600">
						Périmètre : {service.perimeter}
					</p>

					<!-- Light gray separation line -->
					<div class="mb-6 border-t border-gray-200"></div>
					
					<!-- Status indicators -->
					<div class="space-y-3">
						<!-- Last updated -->
						<div class="flex items-center gap-2 text-sm text-gray-600">
							<i class="ri-time-line text-gray-400"></i>
							<span>Actualisé il y a {service.lastUpdated}</span>
						</div>

						<!-- Synchronization status -->
						<div class="flex items-center gap-2 text-sm text-gray-600">
							<i class="ri-file-copy-line text-gray-400"></i>
							<span>Synchronisé avec un modèle</span>
						</div>
					</div>

					<!-- Action menu (three dots) -->
					<div class="absolute top-4 right-4">
						<button class="p-1 text-gray-400 hover:text-gray-600" aria-label="Actions du service">
							<i class="ri-more-2-line text-lg"></i>
						</button>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Empty state -->
		<div
			class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-16"
		>
			<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
				<i class="ri-service-line text-2xl text-gray-400"></i>
			</div>
			<h3 class="mb-2 text-lg font-medium text-gray-900">Aucun service d'insertion</h3>
			<p class="mb-4 text-center text-sm text-gray-500">
				Vous n'avez pas encore créé de services d'insertion.<br />
				Commencez par ajouter votre premier service.
			</p>
			<button
				onclick={handleAddService}
				class="flex items-center gap-2 rounded-lg bg-[#000638] px-4 py-2 text-white transition-colors hover:bg-[#000638]/90"
			>
				<i class="ri-add-line"></i>
				Ajouter un service
			</button>
		</div>
	{/if}
</div>

<!-- Click outside to close dropdowns -->
<svelte:window
	onclick={(e) => {
		if (!e.target.closest('.relative')) {
			openDropdowns.clear();
			openDropdowns = new Set(openDropdowns);
		}
	}}
/>
