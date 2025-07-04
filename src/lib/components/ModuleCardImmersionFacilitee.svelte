<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';
	export let isActive: boolean = false;
	export let onActivate: () => void = () => {};
</script>

<ModuleCard
	{isActive}
	title="Immersions professionnelles"
	baseline="Faciliter la réalisation des immersions professionnelles"
	subtitle="Immersion Facilitée"
	imgSrc="/images/logo-immersion-facilitee.png"
	imgAlt="Logo Immersion Facilitée"
	href="/structure"
>
	<div class="align-items flex flex-col"></div>
</ModuleCard>
