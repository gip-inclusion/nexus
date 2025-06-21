<script lang="ts">
 	import { page } from '$app/stores';
	import '../../app.css';

	let { data, children } = $props();
	
	const links = [
		{ href: '/structure', label: "Vue d'ensemble" },
		{ href: '/structure/offres-emploi', label: "Offres d'emplois" },
		{ href: '/structure/services-insertion', label: "Services d'insertion" },
		{ href: '/structure/opportunites-commerciales', label: "Opportunités commerciales" }
	];
	
</script>

<div class="flex min-h-screen bg-gray-50 text-[#000638]">
	<aside class="flex w-80 flex-col justify-between bg-[#FBFBFB] text-sm font-medium text-[#0B0B45]">
		<!-- Contenu haut (logo + menu) -->
		<div>
			<div class="p-6">
				<!-- Logo et titre -->
				<div class="flex items-center gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
						<i class="ri-community-line text-xl text-white"></i>
					</div>
					<div>
						<p class="text-sm font-normal text-[#0B0B45]">{data.structure.type || '-'}</p>
						<p class="text-base font-bold text-[#0B0B45]">{data.structure.name || '-'}</p>
					</div>
				</div>
			</div>

			<hr class="border-t border-gray-200" />

			<!-- Menu principal -->
			<nav class="px-6 py-4">
				<ul>
					<!-- Section Structure -->
					<li>
						<div class="mb-2 flex items-center gap-2 font-bold text-[#1E1E9E]">
							<span class="h-5 border-l-2 border-[#1E1E9E]"></span>
							<i class="ri-community-line text-2xl text-[#1E1E9E]"></i>
							<span>Structure</span>
							<svg class="ml-auto h-3 w-3" fill="currentColor">…</svg>
						</div>
						<ul class="mt-2 ml-6 space-y-4 text-[#0B0B45]">
						{#each links as { href, label } (label)}
							<li>
								<a
									href="{href}"
									class:font-bold={$page.url.pathname === href}
									class:font-light={$page.url.pathname !== href}
								>
									{label}
								</a>
							</li>
						{/each}
						</ul>
					</li>
				</ul>
			</nav>
		</div>

		<!-- Footer fixe -->
		<div class="space-y-2 text-center text-sm text-[#6E6E94]">
			<!-- Lien de déconnexion -->
			<form method="POST" action="/auth/logout" class="p-6 pb-4">
				<button
					type="submit"
					class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-[#1E1E9E] px-4 py-3 text-[#1E1E9E] transition-colors hover:bg-[#1E1E9E] hover:text-white"
				>
					<i class="ri-user-line text-lg"></i>
					<span class="font-medium">Se déconnecter</span>
				</button>
			</form>
			<div class="border-t border-gray-200 p-4">
				<div class="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
					<a
						href="/accessibilite"
						class="px-1 underline-offset-2 hover:bg-gray-100 hover:underline"
					>
						Accessibilité : partiellement conforme
					</a>
					<span class="text-gray-300">|</span>
					<a
						href="/mentions-legales"
						class="px-1 underline-offset-2 hover:bg-gray-100 hover:underline"
					>
						Mentions légales
					</a>
					<span class="text-gray-300">|</span>
					<a
						href="/confidentialite"
						class="px-1 underline-offset-2 hover:bg-gray-100 hover:underline"
					>
						Confidentialité
					</a>
					<span class="text-gray-300">|</span>
					<a href="/cgu" class="px-1 underline-offset-2 hover:bg-gray-100 hover:underline"> CGU </a>
				</div>
			</div>
		</div>
	</aside>

	<main class="flex-1 bg-white">
		{@render children()}
	</main>
</div>
