<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';
	export let isActive: boolean = false;
</script>

<ModuleCard
    isActive={isActive}
	title="Rendez-vous"
	baseline="Accélérer les rendez-vous avec vos usagers allocataires du RSA"
	subtitle="RDV-Insertion"
	imgSrc="/images/logo-rdv-insertion.png"
	imgAlt="Logo RDV-Insertion"
	href="/structure"
	borderColorClass="border-gray-200"
>
	<div class="flex flex-col align-items">
	</div>
</ModuleCard>
