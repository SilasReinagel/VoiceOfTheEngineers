<script>
  import { onMount } from 'svelte';
  import state, { isLoggedIn } from '../Store';
  import Container from '../Elements/TightContainer.svelte';
  import SuggestionSummary from '../Components/SuggestionSummary.svelte';
  import AddSuggestionButton from '../Components/AddSuggestionButton.svelte';
  import AddSuggestionForm from '../Components/AddSuggestionForm.svelte';
  import SuggestionDetail from '../Components/SuggestionDetail.svelte';
  import site from '../static-content';
  import operations from '../Backend/operations';

  onMount(() => operations.refreshHottestSuggestions($state));
</script>

<Container>
  <section>
    <a href="./index.html?page=vision"><h1 class="link center">What is {site.name}?</h1></a>

    {#if $state.currentView === 'Hottest'}
      <h1>Hottest Suggestions</h1>
      {#if $state.hottestSuggestions.length > 0}
        {#each $state.hottestSuggestions as s}
          <SuggestionSummary suggestion={s}/>
        {/each}
      {:else}
        <div class="center-vh loader"><h1>... Loading ...</h1></div>
      {/if}
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

  .link {
    text-decoration: underline;
    text-align: center;
    margin-bottom: 1.5em;
  }

  .loader {
    min-height: 40vh;
  }
  
  @media screen and (max-width: 600px) {
    section {
      padding: 0.2em 0.6em;
    }

    h1 {
      text-align: center;
    }
    
    .link {
      font-size: 0.9rem;
    }
  }
</style>