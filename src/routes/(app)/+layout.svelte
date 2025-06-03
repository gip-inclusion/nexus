<script lang="ts">
	import '../../app.css';

	let { data, children } = $props();
</script>

<div class="flex min-h-screen bg-gray-50 text-[#000638]">
	<aside class="w-80 bg-[#FBFBFB] flex flex-col justify-between text-[#0B0B45] text-sm font-medium">
		<!-- Contenu haut (logo + menu) -->
		<div>
			<div class="p-6">
				<!-- Logo et titre -->
				<div class="flex items-center gap-2">
					<div class="bg-black rounded-lg w-10 h-10 flex items-center justify-center">
						<i class="ri-community-line text-xl text-white"></i>
					</div>
					<div>
						<p class="text-sm font-normal text-[#0B0B45]">ETTI</p>
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
							<i class="ri-community-line text-2xl text-[#1E1E9E]"></i>
							<span>Structure</span>
							<svg class="w-3 h-3 ml-auto" fill="currentColor">…</svg>
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
			<!--
			<form method="POST" action="/auth/logout" class="p-6 border-t border-gray-200">
				<button type="submit" class="text-red-600 hover:underline">Se déconnecter</button>
			</form>
			-->
		</div>

		<!-- Footer fixe -->
		<div class="p-4 border-t border-gray-200 text-center text-sm text-[#6E6E94] space-y-2">
			<div class="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-sm">
				<a href="/accessibilite" class="hover:bg-gray-100 px-1 underline-offset-2 hover:underline">
					Accessibilité : partiellement conforme
				</a>
				<span class="text-gray-300">|</span>
				<a href="/mentions-legales" class="hover:bg-gray-100 px-1 underline-offset-2 hover:underline">
					Mentions légales
				</a>
				<span class="text-gray-300">|</span>
				<a href="/confidentialite" class="hover:bg-gray-100 px-1 underline-offset-2 hover:underline">
					Confidentialité
				</a>
				<span class="text-gray-300">|</span>
				<a href="/cgu" class="hover:bg-gray-100 px-1 underline-offset-2 hover:underline">
					CGU
				</a>
			</div>
		</div>
	</aside>

	<main class="flex-1 bg-white">
		{@render children()}
	</main>
</div>