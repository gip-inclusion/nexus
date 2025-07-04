<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let isActive: boolean = false;
	export let onActivate: () => void = () => {};
</script>

<ModuleCard
	{isActive}
	title="Carnets de suivi"
	baseline="Obtenir un support papier qui aide vos usagers à gagner en autonomie"
	subtitle="Mon Récap"
	imgSrc="/images/logo-mon-recap.png"
	imgAlt="Logo Mon Récap"
	href="/structure"
	{onActivate}
>
	<div class="align-items flex flex-col"></div>
</ModuleCard>
