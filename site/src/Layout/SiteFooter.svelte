<script>
  export let company;

  import SingleColorSocialLinks from '../Elements/SingleColorSocialLinks.svelte';

  const year = new Date().getFullYear();
</script>

<footer>
  <div class="row">
    <p>© {year} {company.owner}</p>
  </div>
</footer>

<style>
  footer {
    height: 5.4em;
    background-color: var(--footer-background-color);
    color: var(--footer-color);

    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  p {
    color: var(--footer-color);
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 12px 18px;
    max-width: 48em;
  }

</style>
