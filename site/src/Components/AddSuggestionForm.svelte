<script>
  import operations from '../Backend/operations';
  import state from '../Store';
  import { beforeUpdate, afterUpdate } from 'svelte';

  let shortVersion = '';
  let detail = '';
  let disabled = true;

  const isValidInput = () => {
    if(shortVersion === '' || detail === ''){
      return true;
    }
    return false;
  };

  beforeUpdate(() => {
	  disabled = isValidInput();
  });

  const submit = e => {
    e.preventDefault();
    
    // Show invalid input prompt. Disable submit button visually until form is filled.
    if (!shortVersion || shortVersion.length < 1)
      return;
    if (!detail || detail.length < 1)
      return;      
    
    operations.createSuggestion($state, { authorId: $state.user.userId, title: shortVersion, description: detail });
  };
</script>

<div class="root center">
  <form class="form">
    <h2>If you could had a magic wand and could change anything about your workplace, what would you change?</h2>
    <hr/>
    <input type="text" name="name" placeholder="Short Version" bind:value={shortVersion}/>
    <textarea name="message" placeholder="Detailed Suggestion" bind:value={detail}/>
    <p class='text-center m0'>* Please fill out all fields to submit.</p>
    <button on:click={submit} disabled={disabled} on:click>Submit</button>
  </form>
</div>

<style>
h2 {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
}

input {
  padding: 1em;
  margin: 1em 0;
  background-color: var(--panel-bg);
  border-radius: 12px;
  border: 0px;
}

::placeholder {
  color: var(--secondary-color);
  opacity: 1;
}

button {
  padding: 1em;
  margin: 1em 25%;
  font-size: 1.2em;
  width: 50%;
  border: 0px;
  border-radius: 12px;
  background-color: var(--panel-bg);
  cursor: pointer;
}

textarea {
  padding: 1em;
  margin: 1em 0;
  min-height: 12em;
  background-color: var(--panel-bg);
  border-radius: 12px;
  border: 0px;
}
</style>
