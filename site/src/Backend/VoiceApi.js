import { client } from './apollo';
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

// { authorID, title, description }
export const addSuggestion = (suggestion) => 
  client.mutate({
    mutation: createSuggestionGql,
    variables: { input: suggestion }
  });

export default {
  addSuggestion
};
