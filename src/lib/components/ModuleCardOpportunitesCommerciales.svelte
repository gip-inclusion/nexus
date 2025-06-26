<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let activeOpportunities: number;
</script>

<ModuleCard
	title="Opportunités commerciales"
	subtitle="Le Marché de l'inclusion"
	imgSrc="/images/logo-marche.png"
	imgAlt="Opportunités commerciales logo"
	href="/structure/opportunites-commerciales"
	borderColorClass="border-[#FE5455]"
>
	<p>
		<span class="font-semibold text-red-700">{activeOpportunities}</span> nouvelles opportunités
	</p>
</ModuleCard>
