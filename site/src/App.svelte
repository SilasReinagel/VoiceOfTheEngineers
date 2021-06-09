<script>
	import DefaultLayout from './Layout/DefaultLayout.svelte';
	import { pages } from './static-content.js';

	// import { onMount } from "svelte";
  // import auth from "./authService";
  // import { isLoggedIn, user } from "./Store";

	// let auth0Client;

  const page = '/' + (new URLSearchParams(window.location.search).get('page') || '');
  const matchingRoutes = pages.filter(r => r.path.toLocaleLowerCase() === (page).toLocaleLowerCase());
	const component = matchingRoutes[0].component;
	const pageName = matchingRoutes[0].name;

	// onMount(async () => {
  //   auth0Client = await auth.createClient();

  //   isLoggedIn.set(await auth0Client.isAuthenticated());
  //   user.set(await auth0Client.getUser());
  // });

	// const login = () => {
  //   auth.loginWithPopup(auth0Client);
  // }

  // const logout = () => {
  //   auth.logout(auth0Client);
  // }

</script>

<main>
	<DefaultLayout {pageName} >
		<svelte:component this={component}/>
	</DefaultLayout>
</main>

<style>
main {
	width: 100%;
}
</style>