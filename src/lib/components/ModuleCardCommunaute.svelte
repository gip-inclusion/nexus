<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let isActive: boolean = false;
	export let onActivate: () => void = () => {};
</script>

<ModuleCard
	{isActive}
	title="Forum et évènements"
	baseline="Rejoindre l’espace d’entraide des professionnels de l’inclusion"
	subtitle="la Communauté de l’inclusion"
	imgSrc="/images/logo-communaute.png"
	imgAlt="Logo Communauté"
	href="/structure"
	{onActivate}
>
	<div class="align-items flex flex-col"></div>
</ModuleCard>
