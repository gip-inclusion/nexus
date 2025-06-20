<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { services } = data;

	let openDropdowns = $state(new Set<number>());

	function toggleDropdown(serviceId: number) {
		if (openDropdowns.has(serviceId)) {
			openDropdowns.delete(serviceId);
		} else {
			openDropdowns.add(serviceId);
		}
		openDropdowns = new Set(openDropdowns);
	}

	function closeAllDropdowns() {
		openDropdowns.clear();
		openDropdowns = new Set(openDropdowns);
	}

	function handleAddService() {
		// Handle add service action
		console.log('Add service clicked');
	}

	function handleStatusChange(serviceId: number, newStatus: string) {
		// Handle status change
		console.log('Status change:', serviceId, newStatus);
		closeAllDropdowns();
	}

	function handleActionMenu(serviceId: number) {
		// Handle action menu
		console.log('Action menu:', serviceId);
	}
</script>

<svelte:window onclick={closeAllDropdowns} />

<div class="py-6">
	<!-- Header with title and add button -->
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-[#1E1E9E]">Services d'insertion</h1>
	</div>

	<!-- Services grid -->
	{#if services.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each services as service (service.id)}
				<div class="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<!-- Status dropdown -->
					<div class="relative mb-4">
						<button
							onclick={(e) => {
								e.stopPropagation();
								toggleDropdown(service.id);
							}}
							class="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#1E1E9E] transition-colors hover:bg-blue-100"
						>
							<svg
								class="h-4 w-4 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							{service.status}
							<svg
								class="h-4 w-4 text-gray-400 transition-transform"
								class:rotate-180={openDropdowns.has(service.id)}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>

						{#if openDropdowns.has(service.id)}
							<div
								class="absolute top-full left-0 z-20 mt-1 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
								onclick={(e) => e.stopPropagation()}
							>
								<button
									onclick={() => handleStatusChange(service.id, 'PUBLIÉE')}
									class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#1E1E9E] hover:bg-gray-50"
								>
									<svg
										class="h-4 w-4 text-blue-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									PUBLIÉE
								</button>
								<button
									onclick={() => handleStatusChange(service.id, 'BROUILLON')}
									class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
								>
									<svg
										class="h-4 w-4 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
										/>
									</svg>
									BROUILLON
								</button>
							</div>
						{/if}
					</div>

					<!-- Service title -->
					<h3 class="mb-2 text-lg font-semibold text-[#1E1E9E]">{service.name}</h3>

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
							<svg
								class="h-4 w-4 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>Actualisé le {service.lastUpdate}</span>
						</div>

						<!-- Synchronization status -->
						{#if service.synchronized}
							<div class="flex items-center gap-2 text-sm text-gray-600">
								<svg
									class="h-4 w-4 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
									/>
								</svg>
								<span>Synchronisé avec un modèle</span>
							</div>
						{/if}
					</div>

					<!-- Action menu (three dots) -->
					<div class="absolute top-4 right-4">
						<button
							onclick={() => handleActionMenu(service.id)}
							class="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
							aria-label="Actions du service"
						>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
								/>
							</svg>
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
				<svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-medium text-gray-900">Aucun service d'insertion</h3>
			<p class="mb-4 text-center text-sm text-gray-500">
				Vous n'avez pas encore créé de services d'insertion.<br />
				Commencez par ajouter votre premier service.
			</p>
			<button
				onclick={handleAddService}
				class="flex items-center gap-2 rounded-lg bg-[#1E1E9E] px-4 py-2 text-white transition-colors hover:bg-[#1E1E9E]/90"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
				Ajouter un service
			</button>
		</div>
	{/if}
</div>
