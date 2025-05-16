<script lang="ts">
	import '../../app.css';

	let { data, children } = $props();
</script>

<div class="flex min-h-screen bg-gray-50 text-[#000638]">
	<aside class="w-64 bg-[#FBFBFB] flex flex-col text-[#0B0B45] text-sm font-medium">
		<div class="p-6">
			<!-- Logo et titre -->
			<div class="flex items-center gap-3">
				<div class="bg-black rounded-md p-2">
					<!-- Icône (placeholder ici) -->
					<img src="" alt="icon" class="w-5 h-5" />
				</div>
				<div>
					<p class="text-xs text-[#0B0B45]">ETTI</p>
					<p class="text-base font-bold text-[#0B0B45]">{data.structure.name}</p>
				</div>
			</div>
		</div>

		<hr class="border-t border-gray-200" />

		<!-- Menu principal -->
		<nav class="px-6 py-4">
			<ul>
				<!-- Section Structure -->
				<li>
					<div class="flex items-center text-[#1E1E9E] font-bold gap-2 mb-2">
						<span class="border-l-2 border-[#1E1E9E] h-5"></span>
						<svg class="w-4 h-4" fill="currentColor">…</svg>
						<span>Structure</span>
						<svg class="w-3 h-3 ml-auto" fill="currentColor">…</svg> <!-- chevron -->
					</div>
					<ul class="ml-6 mt-2 space-y-1 text-[#0B0B45]">
						<li><a href="/structure" class="font-semibold">Vue d’ensemble</a></li>
						<li><a href="/structure/offres">Offres d’emplois</a></li>
						<li><a href="/structure/services">Services d’insertion</a></li>
						<li><a href="/structure/opportunites">Opportunités commerciales</a></li>
					</ul>
				</li>
			</ul>
		</nav>

		<!-- Lien de déconnexion -->
		<form method="POST" action="/auth/logout" class="p-6 border-t border-gray-200">
			<button type="submit" class="text-red-600 hover:underline">Se déconnecter</button>
		</form>
	</aside>

	<main class="flex-1 p-8 bg-white">
		{@render children()}
	</main>

</div>