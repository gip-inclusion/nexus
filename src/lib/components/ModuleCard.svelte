<script lang="ts">
	export let isActive: boolean;
	export let title: string;
	export let baseline: string;
	export let subtitle: string;
	export let imgSrc: string;
	export let imgAlt: string;
	export let href: string;
	export let borderColorClass: string;
</script>

<div class="flex flex-col justify-between rounded-lg border {borderColorClass} mb-4 p-4">
	{#if isActive}
		<a {href} class="flex h-full justify-between">
			<div class="flex w-5/12 items-center justify-between pr-6">
				<div class="flex items-center">
					<img src={imgSrc} alt={imgAlt} class="mr-4 h-5 w-5" />
					<div>
						<h3 class="text-base font-bold">{title}</h3>
						<p class="text-xs text-gray-500">{subtitle}</p>
					</div>
				</div>
			</div>
			<div class="flex w-6/12 items-center text-sm">
				<slot />
			</div>
			<div class="flex w-1/12 items-center justify-center">
				<i class="ri-arrow-drop-right-line text-md"></i>
			</div>
		</a>
	{:else}
		<a {href} class="flex h-full justify-between">
			<div class="flex w-11/12 items-center justify-between pr-6">
				<div class="flex items-center">
					<img src={imgSrc} alt={imgAlt} class="mr-4 h-5 w-5" />
					<div>
						<h3 class="text-[#1E1E9E] text-base font-bold">{baseline}</h3>
						<p class="text-xs text-gray-500">{subtitle}</p>
					</div>
				</div>
			</div>
			<div class="flex w-1/12 items-center justify-center">
				<i class="ri-arrow-drop-right-line text-md"></i>
			</div>
		</a>
	{/if}
</div>
