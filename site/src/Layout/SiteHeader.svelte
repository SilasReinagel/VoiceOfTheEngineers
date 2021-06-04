<script>
  import state, { isLoggedIn } from '../Store';
  import company from '../static-content.js';

  const login = () => state.update(s => ({ ...s, userSession: { id: 1 }}));
  const logout = () => state.update(s => ({ ...s, userSession: {}}));
  const returnHome = () => state.update(s => ({ ...s, currentView: 'Hottest' }))
</script>

<header>
  <button on:click={returnHome} class="logo">
    <div class="logo-img">
      <img src={company.logo} alt="Logo"/>
    </div>
    <h1>{company.name}</h1>
  </button>

  {#if !$isLoggedIn}
    <button on:click={login}>
      Login
    </button>
  {/if}
  {#if $isLoggedIn}
    <button on:click={logout}>
      Logout
    </button>
  {/if}
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
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

  .logo {
    background-color: rgba(0,0,0,0);
    border: 0px;
    cursor: pointer;
  }

  .logo-img {
    width: 48px;
  }

  button {
    border: 0px;
    border-radius: 6px;
    background-color: var(--panel-bg);
    padding: 8px;
    min-width: 80px;
  }
</style>
