<script>
  import state, { suggestion } from '../Store';

  let shortVersion = '';
  let detail = '';

  const submit = e => {
    const nowStr = new Date().toLocaleDateString('en-US');
    state.update(s => ({ ...s, 
      hottestSuggestions: s.hottestSuggestions.concat(suggestion(shortVersion, detail, nowStr, nowStr, 0, 0)),
      currentView: 'Hottest'
    }))
  };
</script>

<div class="root center">
  <form class="form">
    <h2>If you could had a magic wand and could change anything about your workplace, what would you change?</h2>
    <hr/>
    <input type="text" name="name" placeholder="Short Version" bind:value={shortVersion}/>
    <textarea name="message" placeholder="Detailed Suggestion" bind:value={detail}/>
    <button on:click={submit}>Submit</button>
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
