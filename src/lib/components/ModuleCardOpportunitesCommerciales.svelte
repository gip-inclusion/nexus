<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';
	export let isActive: boolean;

	export let activeOpportunities: number;
</script>

<ModuleCard
    isActive={isActive}
	title="Opportunités commerciales"
	baseline="Recevoir gratuitement des opportunités commerciales"
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
