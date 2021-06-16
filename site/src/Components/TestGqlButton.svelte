<script>
  import api from '../Backend/VoiceApi';

  const onClick = () => api.createSuggestion({ authorId: "Test", title: "Title", description: "Description" });
</script>

<button on:click={onClick}>Test</button>