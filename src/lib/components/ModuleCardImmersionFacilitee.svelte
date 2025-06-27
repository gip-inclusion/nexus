<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';
	export let isActive: boolean = false;
</script>

<ModuleCard
    isActive={isActive}
	title="Immersions professionnelles"
	baseline="Faciliter la réalisation des immersions professionnelles"
	subtitle="Immersion Facilitée"
	imgSrc="/images/logo-immersion-facilitee.png"
	imgAlt="Logo Immersion Facilitée"
	href="/structure"
>
	<div class="flex flex-col align-items">
	</div>
</ModuleCard>
