import state, { makeSuggestion } from '../Store';
import api from './VoiceApi';

export const toggleSuggestionUpvote = (snapshot, suggestionId) => {
  toggleUpvoteLocal(snapshot, suggestionId);
  //toggleUpvoteServer(snapshot, suggestionId);
};

const toggleUpvoteLocal = (snapshot, id) => {
  const suggestions = snapshot.hottestSuggestions;
  const index = suggestions.findIndex(s => s.id == id);
  const s = suggestions[index];
  const isUpvotedByUser = s.upvotedByCurrentUser;
  const adjustment = isUpvotedByUser ? -1 : 1;
  const updatedSuggestion = makeSuggestion(s.id, s.title, s.detail, s.createdDateTime, s.lastActivityDateTime, s.numUpvotes + adjustment, s.numComments, !isUpvotedByUser);
  suggestions[index] = updatedSuggestion;
  state.update(st => ({ ...st, hottestSuggestions: suggestions.map(x => x) }));  
};

const toggleUpvoteServer = (snapshot, id) => {
    const userId = snapshot.user.userId;
    api.toggleUpvote(id, userId)
      .then(() => refreshHottestSuggestions())
      .catch(e => console.error(e));
};

export const createSuggestion = (suggestion) => {
  console.log({ suggestion });
  api.addSuggestion(suggestion)
    .then(r => console.log(r))  
    .catch(e => console.error(e))
    // Fast client Update before server fetch
    .then(_ => state.update(s => ({ ...s, 
      hottestSuggestions: s.hottestSuggestions.concat(makeSuggestion(-1, suggestion.title, suggestion.description, getNowStr(), getNowStr(), 1, 0, true)),
      currentView: 'Hottest'
    })))
    .then(() => refreshHottestSuggestions());
};

export const refreshHottestSuggestions = (userId) => {
  api.getHottestSuggestions()
    .then(hottest => state.update(s => ({ ...s, hottestSuggestions: hottest })))    
    .catch(e => console.error(e));
};

const getNowStr = () => new Date().toLocaleDateString('en-US');

export default {
  refreshHottestSuggestions,
  createSuggestion,
  toggleSuggestionUpvote
};
