<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { commercialOpportunities } = data;

	const getTypeLabel = (type: string) => {
		return type === 'APPEL_OFFRES' ? "APPEL D'OFFRES" : "PROJET D'ACHAT";
	};

	const getTypeClasses = (type: string) => {
		return type === 'APPEL_OFFRES'
			? 'bg-orange-100 text-orange-700 border border-orange-200'
			: 'bg-pink-100 text-pink-700 border border-pink-200';
	};

	const formatDeadline = (deadline: string | undefined) => {
		if (!deadline) return '';
		const date = new Date(deadline);
		return date.toLocaleDateString('fr-FR', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	};

	const isDeadlineClose = (deadline: string | undefined) => {
		if (!deadline) return false;
		const deadlineDate = new Date(deadline);
		const today = new Date();
		const diffTime = deadlineDate.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays <= 30 && diffDays > 0;
	};

</script>

<div>
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-2xl font-semibold">Opportunités commerciales</h1>
		<div class="flex gap-4">
			<a
				href="https://lemarche.inclusion.beta.gouv.fr/besoins"
				class="flex items-center gap-2 rounded-lg bg-[#1E1E9E] px-4 py-2 text-white transition-colors hover:bg-[#1E1E9E]/90"
				target="_blank"
			>
				<i class="ri-add-line text-xl text-white-600"></i>
				Modifier
			</a>
		</div>
	</div>

	<div class="space-y-4">
		{#each commercialOpportunities as opportunity (opportunity.id)}
			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<!-- Type badge -->
						<div class="mb-3">
							<span
								class={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getTypeClasses(opportunity.type)}`}
							>
								{getTypeLabel(opportunity.type)}
							</span>
						</div>

						<!-- Title -->
						<h2 class="mb-2 text-xl font-semibold text-[#1E1E9E]">
							{opportunity.title}
						</h2>

						<!-- Location -->
						<div class="mb-4 flex items-center text-gray-600">
                            <i class="ri-community-line"></i>
                            {opportunity.location}
						</div>

						<!-- Deadline warning if applicable -->
						{#if opportunity.deadline && isDeadlineClose(opportunity.deadline)}
							<div class="mb-2 flex items-center font-medium text-orange-600">
								<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
										clip-rule="evenodd"
									></path>
								</svg>
								APPEL D'OFFRES CLÔTURE LE {formatDeadline(opportunity.deadline).toUpperCase()}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}

	</div>
</div>
