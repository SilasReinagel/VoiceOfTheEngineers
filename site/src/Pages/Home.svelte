<script>
  import { isLoggedIn } from '../Store';
  import Container from '../Elements/TightContainer.svelte';
  import SuggestionSummary from '../Components/SuggestionSummary.svelte';
  import AddSuggestion from '../Components/AddSuggestion.svelte';

  const arr = [0, 1, 2, 3];
</script>

<Container>
  <section>
    <h1>Hottest Suggestions</h1>
    {#each arr as s}
      <SuggestionSummary/>
    {/each}
    {#if $isLoggedIn}
      <AddSuggestion/>
    {/if}
  </section>
</Container>

<style>
  section {
    padding: 1em;
    min-height: 83vh;
  }
</style>