<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let isActive: boolean = false;
	export let onActivate: () => void = () => {};
</script>

<ModuleCard
	{isActive}
	title="Rendez-vous"
	baseline="Accélérer les rendez-vous avec vos usagers allocataires du RSA"
	subtitle="RDV-Insertion"
	imgSrc="/images/logo-rdv-insertion.png"
	imgAlt="Logo RDV-Insertion"
	href="/structure"
	{onActivate}
>
	<div class="align-items flex flex-col"></div>
</ModuleCard>
