<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let isActive: boolean;
	export let activeJobs: number;
	export let inactiveJobs: number;
</script>

<ModuleCard
    isActive={isActive}
	title="Offres d'emplois"
	baseline="Faciliter la mise en relation avec les employeurs solidaires"
	subtitle="les Emplois de l’inclusion"
	imgSrc="/images/logo-emplois.png"
	imgAlt="Offres d'emploi logo"
	href="/structure/offres-emploi"
	borderColorClass="border-[#006ADC]"
>
	<div class="align-items flex flex-col">
		<p class="mb-1">
			<span
				class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700"
				>{activeJobs}</span
			> offres actives
		</p>
		<p>
			<span
				class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700"
				>{inactiveJobs}</span
			> offres inactives
		</p>
	</div>
</ModuleCard>
