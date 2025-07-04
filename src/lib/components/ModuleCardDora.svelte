<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let isActive: boolean = false;
	export let activeServices: number;
	export let onActivate: () => void = () => {};
</script>

<ModuleCard
	{isActive}
	title="Services d'insertion"
	baseline="Donner de la visibilité à votre offre de services"
	subtitle="DORA"
	imgSrc="/images/logo-dora.png"
	imgAlt="Services d'insertion logo"
	href="/structure/services-insertion"
	{onActivate}
>
	<div class="align-items flex flex-col">
		<p>
			<span
				class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-700"
				>{activeServices}</span
			> services actifs
		</p>
	</div>
</ModuleCard>
