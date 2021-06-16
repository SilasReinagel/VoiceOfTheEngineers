<script>
  export let suggestion;
  
  import state, { isLoggedIn } from '../Store';
  import { upvoteSuggestion, unUpvoteSuggestion } from '../Backend/operations';  
  import { afterUpdate} from 'svelte';

  const getCurrentDefaultButtonColor = () => suggestion.upvotedByCurrentUser ? "#fff" : "#999";
  const getControlClass = () => $isLoggedIn ? "active" : "";
  const upvoteText = num => num.toString();
  const getCurrentClickOperation = () => 
    !$isLoggedIn 
      ? () => {} 
      : suggestion.upvotedByCurrentUser
        ? () => unUpvoteSuggestion($state, suggestion.id)
        : () => upvoteSuggestion($state, suggestion.id);

  let controlsActive = getControlClass()
  let buttonColor = getCurrentDefaultButtonColor();
  let onClick = getCurrentClickOperation();
  
  afterUpdate(() => {
    controlsActive = getControlClass();
    onClick = getCurrentClickOperation();
    buttonColor = getCurrentDefaultButtonColor();
  })
</script>

<button class="row space-between metascore center-vh {controlsActive}" on:click={onClick}>
  <div class="upvote-icon center-vh">
    {#if $isLoggedIn}
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="36px" height="36px" viewBox="0 0 292.362 292.361" style="enable-background:new 0 0 292.362 292.361;" xml:space="preserve">
    <g>
      <path d="M286.935,197.287L159.028,69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233,1.807-12.85,5.424L5.424,197.287
        C1.807,200.904,0,205.186,0,210.134s1.807,9.233,5.424,12.847c3.621,3.617,7.902,5.425,12.85,5.425h255.813
        c4.949,0,9.233-1.808,12.848-5.425c3.613-3.613,5.427-7.898,5.427-12.847S290.548,200.904,286.935,197.287z" fill={buttonColor} />
    </g>
    </svg>     
    {/if}
  </div>
  <p class="upvotes">{upvoteText(suggestion.numUpvotes)}</p>
</button>

<style>  
.upvotes {
  min-width: 56px;
  margin-left: 6px;
  text-align: right;
}

.metascore {
  margin-right: 1rem;
}

.metascore p {
  color: #fff;
  font-size: 2.5em;
}

.upvote-icon {
  width: 48px;
  height: 48px;
}

button {  
  background-color: rgba(0,0,0,0);
  border: 0px;
  border-radius: 12px;
}

.active {
  cursor: pointer;
}

svg:not(:root) {
  width:100%;
  height: auto;
}

@media screen and (max-width: 600px) {
  .upvotes {
    min-width: 32px;
  }
  
  .metascore p {
    font-size: 1.6em;
  }

  .metascore {
    margin-right: 8px;
  }

  .upvote-icon {
    width: 32px;
  }
}
</style>