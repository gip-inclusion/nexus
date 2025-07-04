<script lang="ts">
	import ModuleCard from './ModuleCard.svelte';

	export let isActive: boolean = false;
	export let activeOpportunities: number;
	export let onActivate: () => void = () => {};
</script>

<ModuleCard
	{isActive}
	title="Opportunités commerciales"
	baseline="Recevoir gratuitement des opportunités commerciales"
	subtitle="Le Marché de l'inclusion"
	imgSrc="/images/logo-marche.png"
	imgAlt="Opportunités commerciales logo"
	href="/structure/opportunites-commerciales"
	{onActivate}
>
	<p>
		<span class="font-semibold text-red-700">{activeOpportunities}</span> nouvelles opportunités
	</p>
</ModuleCard>
