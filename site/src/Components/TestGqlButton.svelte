<script>
  import { client } from '../apollo';
  import gql from 'graphql-tag';

  const createSuggestionGql = gql`
      mutation CreateSuggestion($input: CreateSuggestionInput!) {
        createSuggestion(input: $input) {
          authorId
          upvotes
          title
          description
          createdOn
          updatedOn
        }
      }
  `;

  const onClick = () =>
    client.mutate({
      mutation: createSuggestionGql,
      variables: { input: { authorId: "Test", title: "Title", description: "Description" } }
    })
    .then(r => console.log(r));
  
</script>

<button on:click={onClick}>Test</button>