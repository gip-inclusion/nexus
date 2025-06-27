<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';
	export let isActive: boolean = false;
</script>

<ModuleCard
    isActive={isActive}
    title="Forum et évènements"
	baseline="Rejoindre l’espace d’entraide des professionnels de l’inclusion"
	subtitle="la Communauté de l’inclusion"
	imgSrc="/images/logo-communaute.png"
	imgAlt="Logo Communauté"
	href="/structure"
	borderColorClass="border-gray-200"
>
	<div class="flex flex-col align-items">
	</div>
</ModuleCard>
