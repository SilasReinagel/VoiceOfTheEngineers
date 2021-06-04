import { derived, readable, writable } from 'svelte/store';

const suggestion = (title, detail, createdDateTime, lastActivityDateTime, upvotes, numComments) => ({ title, detail, createdDateTime, lastActivityDateTime, upvotes, numComments });
const testSuggestions = [ 
  suggestion('Simplify Deployment Process - 1-Click Approval to Deploy', '', '5/27/21', '5/27/21', 26, 2),
  suggestion('Create F# Web API Template', '', '5/29/21', '5/29/21', 8, 0),
  suggestion('This Is An Example Very Very, Very, Very, Very, Very, Very, Very, Very, Very, Very Long Suggestion', '', '5/29/21', '5/29/21', 4, 1),
];

const initialState = {
  userSession: {},
  hottestSuggestions: testSuggestions,
  suggestionDetail: {}
};

export const state = writable(initialState);
export const isLoggedIn = derived(state, $state => !!$state.userSession.id);
export default state;