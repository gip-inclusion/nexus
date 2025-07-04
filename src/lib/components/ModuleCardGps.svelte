<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let isActive: boolean = false;
	export let onActivate: () => void = () => {};
</script>

<ModuleCard
	{isActive}
	title="Groupes de suivi"
	baseline="Simplifier l’accompagnement socio-professionnel en partageant les informations sur les usagers"
	subtitle="GPS"
	imgSrc="/images/logo-gps.png"
	imgAlt="Logo GPS"
	href="/structure"
	{onActivate}
>
	<div class="align-items flex flex-col"></div>
</ModuleCard>
