<script>
  import SiteHeader from './SiteHeader.svelte';
  import SiteFooter from './SiteFooter.svelte';
  import CompanyFooter from './CompanyFooter.svelte';

  import company from '../static-content.js';
</script>

<style>
  section {
    min-height: 80vh;
  }
</style>

<SiteHeader/>
<section>
  <slot/>
</section>
<SiteFooter company={company} />

