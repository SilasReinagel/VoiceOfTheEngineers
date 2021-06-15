<script>
  export let suggestion;

  import UpvoteWidget from '../Components/UpvoteWidget.svelte';
  import { commentsEnabled } from '../static-content';
  import state from '../Store';

  const viewSuggestionDetails = _ => {
    state.update(s => ({ ...s, suggestionDetail: suggestion, currentView: 'SuggestionDetail' }));
  };
</script>

<div class="suggestion-summary">
  <div class="row center full-width">
    <UpvoteWidget suggestion={suggestion}/>
    <div class="suggestion-summary">
      <button on:click={viewSuggestionDetails} class="idea row">
        <h2>{suggestion.title}</h2>
      </button>
      <div class="row space-between">
        <p>Last Activity: {suggestion.lastActivityDateTime}</p>
        <p class="mobile-hidden">Created: {suggestion.createdDateTime}</p>
        {#if commentsEnabled}
        <button on:click={viewSuggestionDetails} class="link-button">
          <p><u>{suggestion.numComments} comments</u></p>
        </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
.suggestion-summary {
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 12px;
}

.idea {
  padding: 18px;
  border-radius: 12px;
  background-color: var(--panel-bg);
  width: 100%;
}

.suggestion-summary {
  width: 100%;
}

h2 {
  margin: 0;
  width: 100%;
  text-align: left;
}

.idea h2 {
  color: #000;
}

p {
  margin: 0;
  color: #fff;
}

button {
  cursor: pointer;
  border: 0px;  
}

.link-button {
  background-color: rgba(0,0,0,0);
}

@media screen and (max-width: 600px) {
   h2 {
     font-size: 1em;
   }

   p {
     font-size: 0.7rem;
   }

   .suggestion-summary {
     padding: 4px;
     margin: 6px 0;
   }

   .idea {
     padding: 8px;
   }
}
</style>
