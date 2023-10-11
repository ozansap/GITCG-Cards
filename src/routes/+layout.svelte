<script>
	import Nav from '$lib/components/Nav.svelte';
	import { store_savedDecks } from '$lib/utils/stores';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import '../app.css';
	import Toaster from '$lib/components/Toaster.svelte';

	if (browser) store_savedDecks.load(window);
	$: route = $page.route.id ?? '/';
</script>

<slot />
<Nav {route} />
<Toaster />
