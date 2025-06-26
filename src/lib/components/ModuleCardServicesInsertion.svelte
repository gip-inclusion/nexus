<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let activeServices: number;
</script>

<ModuleCard
	title="Services d'insertion"
	subtitle="DORA"
	imgSrc="/images/logo-dora.png"
	imgAlt="Services d'insertion logo"
	href="/structure/services-insertion"
	borderColorClass="border-[#5B12EB]"
>
	<div class="flex flex-col align-items">
		<p>
			<span
				class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-700"
				>{activeServices}</span
			> services actifs
		</p>
	</div>
</ModuleCard>
