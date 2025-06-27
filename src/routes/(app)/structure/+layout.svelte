<script lang="ts">
	import { page } from '$app/state';
	import { ModuleName, isActiveModule } from '$lib/module.js';

	const pathname = $derived(() => page.url.pathname);

	let { children, data } = $props();

	const { structure } = data;

	// Mapping des modules vers les entrées de navigation
	const moduleNavMapping = [
		{
			moduleKey: ModuleName.Emplois,
			href: '/structure/offres-emploi',
			label: "Offres d'emploi",
			isActive: (path: string) => path.startsWith('/structure/offres-emploi')
		},
		{
			moduleKey: ModuleName.Dora,
			href: '/structure/services-insertion',
			label: "Services d'insertion",
			isActive: (path: string) => path.startsWith('/structure/services-insertion')
		},
		{
			moduleKey: ModuleName.Marche,
			href: '/structure/opportunites-commerciales',
			label: 'Opportunités commerciales',
			isActive: (path: string) => path.startsWith('/structure/opportunites-commerciales')
		}
	];

	// Navigation de base (toujours visible)
	const baseNavItems = [
		{
			href: '/structure',
			label: "Vue d'ensemble",
			isActive: (path: string) => path === '/structure'
		}
	];

	// Filtrer les entrées de navigation selon les modules actifs
	const moduleNavItems = $derived(
		moduleNavMapping.filter((item) => isActiveModule(item.moduleKey, structure.modules))
	);
	const navItems = $derived([...baseNavItems, ...moduleNavItems]);

	const getNavLinkClasses = (isActive: boolean) => {
		const baseClasses = '-mb-px border-b-2 pb-2 transition-colors duration-200';
		const activeClasses = 'border-[#1E1E9E] font-medium text-[#1E1E9E]';
		const inactiveClasses = 'border-transparent text-gray-600 hover:text-gray-800';

		return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
	};
</script>

<header class="px-8 py-6">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold text-black">Structure</h1>
	</div>

	<nav class="mt-8 flex space-x-8 border-b border-gray-200 text-base">
		{#each navItems as navItem (navItem.label)}
			<a href={navItem.href} class={getNavLinkClasses(navItem.isActive(pathname()))}>
				{navItem.label}
			</a>
		{/each}
	</nav>
</header>

<div class="px-8">
	{@render children()}
</div>
