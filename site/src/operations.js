import state, { suggestion } from './Store';

export const upvoteSuggestion = (snapshot, id) => {
  const suggestions = snapshot.hottestSuggestions;
  const index = suggestions.findIndex(s => s.id == id);
  const s = suggestions[index];
  const updatedSuggestion = suggestion(s.id, s.title, s.detail, s.createdDateTime, s.lastActivityDateTime, s.numUpvotes + 1, s.numComments, true);
  suggestions[index] = updatedSuggestion;
  state.update(st => ({ ...st, hottestSuggestions: suggestions.map(x => x) }));
}

export const unUpvoteSuggestion = (snapshot, id) => {
  const suggestions =  snapshot.hottestSuggestions;
  const index = suggestions.findIndex(s => s.id == id);
  const s = suggestions[index];
  const updatedSuggestion = suggestion(s.id, s.title, s.detail, s.createdDateTime, s.lastActivityDateTime, s.numUpvotes - 1, s.numComments, false);
  suggestions[index] = updatedSuggestion;
  state.update(st => ({ ...st, hottestSuggestions: suggestions.map(x => x) }));
}