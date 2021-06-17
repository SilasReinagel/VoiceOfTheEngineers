import state, { makeSuggestion } from '../Store';
import api from './VoiceApi';

export const upvoteSuggestion = (snapshot, id) => {
  const suggestions = snapshot.hottestSuggestions;
  const index = suggestions.findIndex(s => s.id == id);
  const s = suggestions[index];
  const updatedSuggestion = makeSuggestion(s.id, s.title, s.detail, s.createdDateTime, s.lastActivityDateTime, s.numUpvotes + 1, s.numComments, true);
  suggestions[index] = updatedSuggestion;
  state.update(st => ({ ...st, hottestSuggestions: suggestions.map(x => x) }));  
  // Refresh suggestions from server
};

export const unUpvoteSuggestion = (snapshot, id) => {
  const suggestions =  snapshot.hottestSuggestions;
  const index = suggestions.findIndex(s => s.id == id);
  const s = suggestions[index];
  const updatedSuggestion = makeSuggestion(s.id, s.title, s.detail, s.createdDateTime, s.lastActivityDateTime, s.numUpvotes - 1, s.numComments, false);
  suggestions[index] = updatedSuggestion;
  state.update(st => ({ ...st, hottestSuggestions: suggestions.map(x => x) }));  
  // Refresh suggestions from server
};

export const createSuggestion = (suggestion) => {
  console.log({ suggestion });
  api.addSuggestion(suggestion)
    .then(r => console.log(r))
    .catch(e => console.log(e))
    // Fast client Update before server fetch
    .then(_ => state.update(s => ({ ...s, 
      hottestSuggestions: s.hottestSuggestions.concat(makeSuggestion(-1, suggestion.title, suggestion.description, getNowStr(), getNowStr(), 1, 0, true)),
      currentView: 'Hottest'
    })));
  // Refresh suggestions from server
};

const getNowStr = () => new Date().toLocaleDateString('en-US');

export default {
  createSuggestion,
  upvoteSuggestion,
  unUpvoteSuggestion
};
