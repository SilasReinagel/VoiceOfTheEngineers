<script>
  import state, { isLoggedIn } from '../Store';
  import Container from '../Elements/TightContainer.svelte';
  import SuggestionSummary from '../Components/SuggestionSummary.svelte';
  import AddSuggestion from '../Components/AddSuggestion.svelte';
</script>

<Container>
  <section>
    <h1>Hottest Suggestions</h1>
    {#each $state.hottestSuggestions as s}
      <SuggestionSummary suggestion={s}/>
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