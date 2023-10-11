<script lang="ts">
	import { store_toasts } from '$lib/utils/stores.js';
	import SVG_close from '$lib/svg/close.svelte';
</script>

<div class="fixed bottom-28 z-20 flex w-full flex-col-reverse gap-4 px-4">
	{#each $store_toasts as toast}
		<div class="flex items-center rounded-lg border-2 p-2 text-lg font-bold" style="color: {toast.colors.primary}; background-color: {toast.colors.secondary};border-color: {toast.colors.primary};">
			<div class="mr-2 w-8">
				<svelte:component this={toast.icon} />
			</div>
			<h3 class="flex-1">{toast.text}</h3>
			<button class="ml-auto w-6" on:click={() => store_toasts.remove(toast.id)}>
				<SVG_close />
			</button>
		</div>
	{/each}
</div>
