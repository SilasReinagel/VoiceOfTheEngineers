<script>
  import state, { isLoggedIn } from '../Store';
  import Container from '../Elements/TightContainer.svelte';
  import SuggestionSummary from '../Components/SuggestionSummary.svelte';
  import AddSuggestionButton from '../Components/AddSuggestionButton.svelte';
  import AddSuggestionForm from '../Components/AddSuggestionForm.svelte';
  import SuggestionDetail from '../Components/SuggestionDetail.svelte';
</script>

<Container>
  <section>
  {#if $state.currentView === 'Hottest'}
    <h1>Hottest Suggestions</h1>
    {#each $state.hottestSuggestions as s}
      <SuggestionSummary suggestion={s}/>
    {/each}
    {#if $isLoggedIn}
      <AddSuggestionButton/>
    {/if}
  {/if}

  {#if $state.currentView === 'SuggestionDetail'}
    <SuggestionDetail />
  {/if}

  {#if $state.currentView === 'NewSuggestion'}
    <AddSuggestionForm />
  {/if}
  
  </section>
</Container>

<style>
  section {
    padding: 1em;
    min-height: 83vh;
  }
</style>