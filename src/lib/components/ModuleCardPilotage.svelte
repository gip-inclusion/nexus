<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';
	export let isActive: boolean = false;
</script>

<ModuleCard
    isActive={isActive}
	title="Carnets de suivi"
	baseline="Favoriser les dispositifs d'inclusion à travers la donnée"
	subtitle="le Pilotage de l’inclusion"
	imgSrc="/images/logo-pilotage.png"
	imgAlt="Logo Pilotage"
	href="/structure"
	borderColorClass="border-gray-200"
>
	<div class="flex flex-col align-items">
	</div>
</ModuleCard>
