<script>
	import { client } from './apollo';
	import { setClient } from 'svelte-apollo';
	import DefaultLayout from './Layout/DefaultLayout.svelte';
	import site, { pages } from './static-content.js';

  const page = '/' + (new URLSearchParams(window.location.search).get('page') || '');
  const matchingRoutes = pages.filter(r => r.path.toLocaleLowerCase() === (page).toLocaleLowerCase());
	const component = matchingRoutes[0].component;
	const pageName = matchingRoutes[0].name;

  setClient(client);
</script>

<main style={site.backgroundInlineStyle}>
	<DefaultLayout {pageName} >
		<svelte:component this={component}/>
	</DefaultLayout>
</main>

<style>
main {
	width: 100%;
}
</style>