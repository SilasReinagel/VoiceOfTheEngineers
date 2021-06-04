<script>
  export let suggestion;

  import state, { isLoggedIn } from '../Store';

  const viewSuggestionDetails = _ => {
    state.update(s => ({ ...s, suggestionDetail: suggestion, currentView: 'SuggestionDetail' }));
  };

  const upvoteText = num => num.toString();
</script>

<div class="root">
  <div class="row center full-width">
    <div class="metascore center-vh">
      <div class="upvote-icon center-vh">
        {#if $isLoggedIn}
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="36px" height="36px" viewBox="0 0 292.362 292.361" style="enable-background:new 0 0 292.362 292.361;" xml:space="preserve">
        <g>
          <path d="M286.935,197.287L159.028,69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233,1.807-12.85,5.424L5.424,197.287
            C1.807,200.904,0,205.186,0,210.134s1.807,9.233,5.424,12.847c3.621,3.617,7.902,5.425,12.85,5.425h255.813
            c4.949,0,9.233-1.808,12.848-5.425c3.613-3.613,5.427-7.898,5.427-12.847S290.548,200.904,286.935,197.287z" fill="#fff"/>
        </g>
        </svg>     
        {/if}
      </div>
      <p class="upvotes">{upvoteText(suggestion.upvotes)}</p>
    </div>
    <div class="suggestion-summary">
      <button on:click={viewSuggestionDetails} class="idea row">
        <h2>{suggestion.title}</h2>
      </button>
      <div class="row space-between">
        <p>Last Activity: {suggestion.lastActivityDateTime}</p>
        <p>Created: {suggestion.createdDateTime}</p>
        <button on:click={viewSuggestionDetails} class="link-button">
          <p><u>{suggestion.numComments} comments</u></p>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
.root {
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 12px;
}

.upvote-icon {
  width: 64px;
  height: 64px;
}

.upvotes {
  min-width: 56px;
  text-align: center;
}

.metascore {
  margin-right: 20px;
}

.metascore p {
  color: #fff;
  font-size: 2.5em;
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
</style>
