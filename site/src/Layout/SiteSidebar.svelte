<script>
  export let open = false;

  import HamburgerIcon from '../Elements/HamburgerIcon.svelte';

  import company, { pages } from '../static-content';
</script>

<aside class="border-r-2 shadow-lg" class:open>
  <nav class="navbar">
    <div class="align-right">
      <h1>{company.name}</h1>
      <HamburgerIcon bind:open/>
    </div>
    {#each pages as page}
      <a class="navlink" href={page.href}>{page.name}</a>
    {/each}
  </nav>
</aside>

<style>
  h1 {
    margin: 0;
    white-space: nowrap;
  }

  .align-right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    padding: 1.6em;
    width: 100%;
    height: 80px;
  }

	aside {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
		left: -110%;
    transition: left 0.3s ease-in-out;
    background-color: var(--primary-background-color);
    z-index: 99;
  }

  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

	.open {
		left: 0
  }

  .navlink {
    color: var(--primary-color);
    margin: 0.5em;
    line-height: 22px;
    font-size: 1.6em;
    font-weight: 700;
    font-family: Oswald,sans-serif;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition-duration: 0.2s;
  }

  .navlink:hover {
    filter: brightness(0) saturate(100%) invert(81%) sepia(6%) saturate(2751%) hue-rotate(341deg) brightness(88%) contrast(74%);
  }
</style>
