<script>
  let sidebarOpen = false;

  import HamburgerIcon from '../Elements/HamburgerIcon.svelte';
  import SiteSidebar from './SiteSidebar.svelte';

  import company, { pages } from '../static-content.js';
</script>

<header>
  <a href="." class="logo">
    <div class="logo-img">
      <img src={company.logo} alt="Logo"/>
    </div>
    <h1>{company.name}</h1>
  </a>
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

  .navlink {
    color: var(--header-color);
    margin: 5px 15px;
    font-size: 1.1em;
    line-height: 22px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition-duration: 0.2s;
  }

  .navlink:hover {
    color: var(--header-color-hover);
  }

</style>
