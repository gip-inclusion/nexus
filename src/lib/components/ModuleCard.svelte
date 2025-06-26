<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let imgSrc: string;
	export let imgAlt: string;
	export let href: string;
	export let borderColorClass: string;
</script>

<div class="flex flex-col justify-between rounded-lg border {borderColorClass} p-4 mb-4">
	<a {href} class="flex h-full">
		<div class="flex items-center justify-between w-5/12 pr-6">
			<div class="flex items-center">
				<img src={imgSrc} alt={imgAlt} class="mr-1 h-5 w-5" />
				<div>
					<h3 class="text-base font-bold">{title}</h3>
					<p class="text-xs text-gray-500">{subtitle}</p>
				</div>
			</div>
		</div>
		<div class="flex items-center text-sm w-6/12">
			<slot />
		</div>
		<div class="flex items-center justify-center w-1/12">
		    <i class="ri-arrow-drop-right-line text-md"></i>
		</div>
	</a>
</div>
