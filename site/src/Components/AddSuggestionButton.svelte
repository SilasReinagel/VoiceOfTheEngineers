<script>
  import state from '../Store';

  const addNewSuggestion = () => state.update(s => ({ ...s, currentView: 'NewSuggestion' }));
</script>

<div class="root">
  <button on:click={addNewSuggestion}>
    <h1 class="center-vh">+ New Suggestion</h1>
  </button>
</div>

<style>
.root {
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 12px 0;
  border-radius: 12px;
}

button {
  cursor: pointer;
  border: 0px;
  background-color: rgba(0,0,0,0);
}

@media screen and (max-width: 600px) {
  h1 {
    
  }
}


</style>
