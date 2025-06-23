<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { jobs } = data;

	function toggleApplications() {
		// Logic to block/unblock applications
		console.log('Toggle applications');
	}

	function createNewJob() {
		// Logic to create new job posting
		console.log('Create new job');
	}

	function refreshJob(jobId: number) {
		// Logic to refresh job posting
		console.log('Refresh job:', jobId);
	}

	function deleteJob(jobId: number) {
		// Logic to delete job posting
		console.log('Delete job:', jobId);
	}

	function toggleJobStatus(jobId: number, currentStatus: string) {
		// Logic to toggle job status
		console.log('Toggle job status:', jobId, currentStatus);
	}
</script>

<div class="py-6">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-[#1E1E9E]">Offres d'emplois</h1>
		<div class="flex gap-4">
			<button
				onclick={toggleApplications}
				class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
					<circle cx="12" cy="16" r="1"></circle>
					<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
				</svg>
				Bloquer l'envoi de candidatures
			</button>
			<button
				onclick={createNewJob}
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
				Créer une nouvelle fiche de poste
			</button>
		</div>
	</div>

	{#if jobs.length > 0}
		<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Titre du poste
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Localisation
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Nombre de postes
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Statut
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Dernière mise à jour
						</th>
						<th class="relative px-6 py-3">
							<span class="sr-only">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each jobs as job (job.id)}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 whitespace-nowrap">
								<a
									href="/structure/offres-emploi/{job.id}"
									class="font-medium text-[#1E1E9E] hover:text-[#1E1E9E]/80 hover:underline"
								>
									{job.title}
								</a>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center gap-2 text-gray-600">
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
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									{job.location}
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-900">
								{job.positions}
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center gap-3">
									<label class="relative inline-flex cursor-pointer items-center">
										<input
											type="checkbox"
											class="peer sr-only"
											checked={job.status === 'active'}
											onchange={() => toggleJobStatus(job.id, job.status)}
										/>
										<div
											class="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[#1E1E9E] peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"
										></div>
									</label>
									<span class="text-sm font-medium text-gray-900">
										{job.status === 'active' ? 'Ouvert' : 'Fermé'}
									</span>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{job.lastUpdate}
							</td>
							<td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
								<div class="flex gap-2">
									<button
										onclick={() => refreshJob(job.id)}
										class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
										title="Actualiser"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
											/>
										</svg>
									</button>
									<button
										onclick={() => deleteJob(job.id)}
										class="rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
										title="Supprimer"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<!-- Empty state -->
		<div class="py-12 text-center">
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
				<svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6.13a2 2 0 01-1.996 2L14 13"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-medium text-gray-900">Aucune offre d'emploi</h3>
			<p class="mb-4 text-gray-500">
				Vous n'avez pas encore créé d'offres d'emploi. Commencez par créer votre première offre.
			</p>
		</div>
	{/if}
</div>
