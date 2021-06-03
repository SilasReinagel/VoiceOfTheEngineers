import { derived, readable, writable } from 'svelte/store';

const initialState = {
  userSession: {},
  hottestSuggestions: [],
  suggestionDetail: {}
};

export const state = writable(initialState);
export const isLoggedIn = derived(state, $state => !!$state.userSession.id);
export default state;