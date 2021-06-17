<script>
  import state, { isLoggedIn } from '../Store';
  import company from '../static-content.js';
  import HomeIcon from '../Elements/HomeIcon.svelte';
  import LoginIcon from '../Elements/LoginIcon.svelte';
  import LogoutIcon from '../Elements/LogoutIcon.svelte';
  import { onMount } from "svelte";
  import auth from "../authService";

	let auth0Client;
	onMount(async () => auth0Client = await auth.handeCreateClient());

	const login = () => {
    auth.loginWithPopup(auth0Client);
  };

  const logout = () => {
    auth.logout(auth0Client);
  };

  const iconButtonSize = 40;

  const returnHome = () => {
    state.update(s => ({ ...s, currentView: 'Hottest' }));
    if ((new URLSearchParams(window.location.search).get('page') || '') === 'vision')
    {
      window.history.pushState({}, document.title, "/");
      window.location.pathname = "/";
    }
  };
</script>

<header>
  <button on:click={returnHome} class="logo transparent-button">
    <div class="logo-img">
      <img src={company.logo} alt="Logo"/>
    </div>
    <h1>{company.name}</h1>
  </button>

  <div class="buttons">
    {#if $state.currentView !== 'Hottest'}
    <button on:click={returnHome} class="icon-button">
      <HomeIcon size={iconButtonSize}/>
    </button>
    {/if}

    {#if !$isLoggedIn}
      <button on:click={login} class="icon-button">
        <LoginIcon size={iconButtonSize}/>
      </button>
    {/if}
    {#if $isLoggedIn}
      <button on:click={logout} class="icon-button">
        <LogoutIcon size={iconButtonSize}/>
      </button>
    {/if}
  </div>

</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    justify-items: center;
    background-color: var(--header-background-color);
    height: 82px;
    padding: 0 16px;
  }

  h1 {
    color: var(--header-color);
    margin: 10px;
  }

  .logo {
    display: flex;
    flex-direction: row;
    max-height: 92px;
  }

  .transparent-button {
    background-color: rgba(0,0,0,0);
    border: 0px;
    cursor: pointer;
  }

  .logo-img {
    min-width: 36px;
    width: 48px;
    margin-top: auto;
    margin-bottom: auto;
  }

  .icon-button {
    border: 0px;
    border-radius: 6px;
    background-color: rgba(0,0,0,0);
    min-width: 48px;
    cursor: pointer;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 8px;
    margin-right: 8px;
  }
  
  @media screen and (max-width: 600px) {
    .logo-img {
      min-width: 32px;
    }

    .icon-button {    
      min-width: 32px;
      width: 44px;
    }

    header {
      height: 66px;
      padding: 0 8px;
    }
  }
</style>
