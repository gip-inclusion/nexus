<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';
	export let isActive: boolean;
</script>

<ModuleCard
    isActive={isActive}
	title="Carnets de suivi"
	baseline="Obtenir un support papier qui aide vos usagers à gagner en autonomie"
	subtitle="Mon Récap"
	imgSrc="/images/logo-mon-recap.png"
	imgAlt="Logo Mon Récap"
	href="/structure"
	borderColorClass="border-gray-200"
>
	<div class="flex flex-col align-items">
	</div>
</ModuleCard>
