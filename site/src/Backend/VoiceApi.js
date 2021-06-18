import { client } from './apollo';
import gql from 'graphql-tag';
import { makeSuggestion } from '../Store';

const numberDescendingSort = (a,b) => b-a;
const dateStr = dateTime => new Date(dateTime).toLocaleDateString('en-US');
const logged = x => { console.log(x); return x; };

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

const getHottestSuggestionsGql = gql`
  query ListSuggestions($authorId: ID) {
    listSuggestions(authorId: $authorId) {
      _id
      authorId
      upvotes
      title
      description
      createdOn
      updatedOn
    }
  }
`;

export const getHottestSuggestions = (userId) => 
  client.query({
    query: getHottestSuggestionsGql
  })
  .then(o => o.data.listSuggestions)
  .then(suggestions => suggestions.filter(s => s.title.length > 0 && s.title !== 'Title'))
  .then(suggestions => [...suggestions].sort(s => numberDescendingSort(s.upvotes.length)))
  .then(s => logged(s))
  .then(suggestions => suggestions
    .map(s => makeSuggestion(
      s._id, 
      s.title, 
      s.description, 
      dateStr(s.createdOn), 
      !!s.updatedOn ? dateStr(s.updatedOn) : dateStr(s.createdOn), 
      s.upvotes.length, 
      -1, // TODO: Num Comments
      s.upvotes.includes(userId)
    )));


// { userId, suggestionId }
const toggleUpvoteGql = gql`
  mutation UpvoteSuggestion($input: UpvoteSuggestionInput!) {
    upvoteSuggestion(input: $input) {
      authorId
      upvotes
      title
      description
      createdOn
      updatedOn
    }
  }
`;

export const toggleUpvote = (userId, suggestionId) =>
  client.mutate({ 
    mutation: toggleUpvoteGql,    
    variables: { input: { userId, suggestionId } }
  });

export default {
  addSuggestion,
  getHottestSuggestions,
  toggleUpvote
};



