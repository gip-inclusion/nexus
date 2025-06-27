<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';
	export let isActive: boolean = false;
</script>

<ModuleCard
    isActive={isActive}
	title="Groupes de suivi"
	baseline="Simplifier l’accompagnement socio-professionnel en partageant les informations sur les usagers"
	subtitle="GPS"
	imgSrc="/images/logo-gps.png"
	imgAlt="Logo GPS"
	href="/structure"
	borderColorClass="border-gray-200"
>
	<div class="flex flex-col align-items">
	</div>
</ModuleCard>
