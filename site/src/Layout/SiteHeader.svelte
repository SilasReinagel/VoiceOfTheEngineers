<script>
  import state, { isLoggedIn } from '../Store';
  import company from '../static-content.js';

  const login = () => state.update(state => ({ ...state, userSession: { id: 1 }}));
  const logout = () => state.update(state => ({ ...state, userSession: {}}));
</script>

<header>
  <a href="." class="logo">
    <div class="logo-img">
      <img src={company.logo} alt="Logo"/>
    </div>
    <h1>{company.name}</h1>
  </a>

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

  .logo-img {
    width: 48px;
  }

  button {
    border: 0px;
    border-radius: 6px;
    background-color: #fff;
    padding: 8px;
    min-width: 80px;
  }
</style>
