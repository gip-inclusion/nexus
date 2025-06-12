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
				<div class="mr-4">dernière mise à jour le 11/12/2024</div>
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
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
							<h3 class="text-sm font-semibold">ETTI</h3>
							<p class="text-lg font-bold">Une nouvelle chance</p>
						</div>
					</div>
					<hr class="mb-4 border-gray-200" />
					<p class="mb-2 flex items-center text-sm">
						<i class="ri-map-pin-2-line mr-1 text-gray-600"></i> 513 Rue Sans Souci, 69760 Limonest
					</p>
					<p class="mb-2 flex items-center text-sm text-blue-600">
						<i class="ri-mail-line mr-1 text-gray-600"></i> monemail@gmail.com
					</p>
					<p class="mb-2 flex items-center text-sm">
						<i class="ri-phone-line mr-1 text-gray-600"></i> 01 49 56 78 43
					</p>
					<p class="flex items-center text-sm text-blue-600">
						<i class="ri-global-line mr-1 text-gray-600"></i>
						<a href="http://mon-site-internet.fr" target="_blank" rel="noopener noreferrer"
							>mon-site-internet.fr</a
						>
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
							<h3 class="font-bold" style="margin-bottom: 0;">Offres d’emplois</h3>
							<p class="text-sm text-gray-500" style="margin-top: 0;">les Emplois de l’inclusion</p>
						</div>
					</div>
				</div>
				<div class="mt-2 text-sm">
					<p><span class="font-semibold text-blue-700">3</span> offres d'emplois actives</p>
					<p><span class="font-semibold text-blue-700">2</span> offres d'emplois inactives</p>
				</div>
			</div>

			<!-- Services d'insertion card -->
			<div class="flex flex-col justify-between rounded-lg border border-[#5B12EB] p-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<img
							src="/images/logo-dora.png"
							alt="Services d’insertion logo"
							style="width: 20px; height: 20px; margin-right: 5px;"
						/>
						<div>
							<h3 class="font-bold text-indigo-600" style="margin-bottom: 0;">
								Services d’insertion
							</h3>
							<p class="text-sm text-gray-500" style="margin-top: 0;">DORA</p>
						</div>
					</div>
				</div>
				<div class="mt-2 text-sm">
					<p><span class="font-semibold text-indigo-700">3</span> services d'insertion actifs</p>
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
							<p class="text-sm text-gray-500" style="margin-top: 0;">Le Marché de l’inclusion</p>
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
