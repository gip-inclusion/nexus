<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { jobs } = data;

	function toggleJobStatus(jobId: number, currentStatus: string) {
		// Logic to toggle job status
		console.log('Toggle job status:', jobId, currentStatus);
	}
</script>

<div class="py-6">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-[#1E1E9E]">Offres d'emplois</h1>
		<div class="flex gap-4">
			<a
				href="https://emplois.inclusion.beta.gouv.fr/company/job_description_list"
				class="flex items-center gap-2 rounded-lg bg-[#1E1E9E] px-4 py-2 text-white transition-colors hover:bg-[#1E1E9E]/90"
				target="_blank"
			>
				<i class="ri-add-line text-xl text-white-600"></i>
				Modifier
			</a>
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
									<label class="relative inline-flex items-center">
										<input
											type="checkbox"
											class="peer sr-only"
											checked={job.status === 'active'}
											disabled
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
