<script lang="ts">
	export let data;

	const structure = data.structure;
	const { jobs, applications, services, stats } = data;

	// Formater la date de mise à jour
	const formatDate = (dateString: string) => {
		if (!dateString) return '-';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('fr-FR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			});
		} catch {
			return dateString;
		}
	};
</script>

<div>
	<h2 class="mb-4 inline-block p-1 text-2xl font-semibold">Vue d'ensemble</h2>

	<!-- Description and Coordonnées -->
	<section class="mb-8 flex flex-col rounded-lg border border-gray-200 bg-white p-6">
		<!-- Top row for Title, Date, and Button -->
		<div class="mb-6 flex items-start justify-between">
			<div class="flex-grow pr-4">
				<h2 class="text-base font-semibold">Description et coordonnées</h2>
			</div>
			<div class="flex items-center justify-end text-xs text-gray-500 italic">
				<div class="mr-4">dernière mise à jour le {formatDate(structure.edited_at)}</div>
				<button
					class="rounded border border-blue-600 bg-white px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
					>Modifier</button
				>
			</div>
		</div>

		<!-- Row for Description and Contact Info Block -->
		<div class="flex justify-between">
			<div class="w-2/3 pr-4">
				<!-- Left column for description -->
				<p class="text-sm leading-relaxed text-gray-700">
					{structure.presentation}
				</p>
			</div>
			<div class="w-1/3 pl-4">
				<!-- Right column for Contact Info Block -->
				<div class="rounded-lg border border-gray-200 p-4">
					<div class="mb-4 flex items-center">
						<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#F6F8FF]">
							<i class="ri-community-line text-xl text-blue-600"></i>
						</div>
						<div>
							<h3 class="text-sm font-semibold">{structure.type || '-'}</h3>
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
						{structure.email || '-'}
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
			</div>
		</div>
	</section>

	<!-- Services -->
	<section class="mb-8">
		<h2 class="mb-4 text-base font-semibold">Vos outils actuels</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<!-- Offres d'emploi card -->
			<div class="flex flex-col justify-between rounded-lg border border-[#006ADC] p-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<img
							src="/images/logo-emplois.png"
							alt="Offres d'emploi logo"
							style="width: 20px; height: 20px; margin-right: 5px;"
						/>
						<div>
							<h3 class="font-bold" style="margin-bottom: 0;">Offres d'emplois</h3>
							<p class="text-sm text-gray-500" style="margin-top: 0;">les Emplois de l'inclusion</p>
						</div>
					</div>
				</div>
				<div class="mt-2 text-sm">
					<p class="mb-1">
						<span
							class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700"
							>{stats.activeJobs}</span
						> offres d'emplois actives
					</p>
					<p>
						<span
							class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700"
							>{stats.inactiveJobs}</span
						> offres d'emplois inactives
					</p>
				</div>
			</div>

			<!-- Services d'insertion card -->
			<div class="flex flex-col justify-between rounded-lg border border-[#5B12EB] p-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<img
							src="/images/logo-dora.png"
							alt="Services d'insertion logo"
							style="width: 20px; height: 20px; margin-right: 5px;"
						/>
						<div>
							<h3 class="font-bold text-indigo-600" style="margin-bottom: 0;">
								Services d'insertion
							</h3>
							<p class="text-sm text-gray-500" style="margin-top: 0;">DORA</p>
						</div>
					</div>
				</div>
				<div class="mt-2 text-sm">
					<p>
						<span
							class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-700"
							>{stats.activeServices}</span
						> services d'insertion actifs
					</p>
				</div>
			</div>

			<!-- Opportunités commerciales card -->
			<div class="flex flex-col justify-between rounded-lg border border-[#FE5455] p-4">
				<div style="display: flex; align-items: center;">
					<div class="flex items-center">
						<img
							src="/images/logo-marche.png"
							alt="Opportunités commerciales logo"
							style="width: 20px; height: 20px; margin-right: 5px;"
						/>
						<div>
							<h3 class="font-bold text-red-600" style="margin-bottom: 0;">
								Opportunités commerciales
							</h3>
							<p class="text-sm text-gray-500" style="margin-top: 0;">Le Marché de l'inclusion</p>
						</div>
					</div>
				</div>
				<div class="mt-2 text-sm">
					<p><span class="font-semibold text-red-700">2</span> nouvelles opportunités</p>
				</div>
			</div>
		</div>
	</section>
</div>
