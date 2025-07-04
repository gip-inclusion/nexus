<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let isActive: boolean = false;
	export let onActivate: () => void = () => {};
</script>

<ModuleCard
	{isActive}
	title="Carnets de suivi"
	baseline="Favoriser les dispositifs d'inclusion à travers la donnée"
	subtitle="le Pilotage de l’inclusion"
	imgSrc="/images/logo-pilotage.png"
	imgAlt="Logo Pilotage"
	href="/structure"
	{onActivate}
>
	<div class="align-items flex flex-col"></div>
</ModuleCard>
