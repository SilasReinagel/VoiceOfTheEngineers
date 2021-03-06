import { derived, get, readable, writable } from 'svelte/store';

const ipsum1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec ultrices dui sapien eget mi proin sed. Donec enim diam vulputate ut pharetra. Morbi tristique senectus et netus et malesuada fames. Est ante in nibh mauris cursus mattis molestie. Velit egestas dui id ornare arcu odio. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mauris nunc congue nisi vitae suscipit. Arcu ac tortor dignissim convallis aenean et tortor at risus. Scelerisque fermentum dui faucibus in. Gravida rutrum quisque non tellus orci. Mus mauris vitae ultricies leo integer malesuada. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. At erat pellentesque adipiscing commodo elit at imperdiet dui. Nibh sit amet commodo nulla facilisi. Id ornare arcu odio ut sem nulla pharetra. Odio ut sem nulla pharetra. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mi in nulla posuere sollicitudin aliquam. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at.';
const ipsum3 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec ultrices dui sapien eget mi proin sed. Donec enim diam vulputate ut pharetra. Morbi tristique senectus et netus et malesuada fames. Est ante in nibh mauris cursus mattis molestie. Velit egestas dui id ornare arcu odio. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mauris nunc congue nisi vitae suscipit. Arcu ac tortor dignissim convallis aenean et tortor at risus. Scelerisque fermentum dui faucibus in. Gravida rutrum quisque non tellus orci. Mus mauris vitae ultricies leo integer malesuada. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. At erat pellentesque adipiscing commodo elit at imperdiet dui. Nibh sit amet commodo nulla facilisi. Id ornare arcu odio ut sem nulla pharetra. Odio ut sem nulla pharetra. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mi in nulla posuere sollicitudin aliquam. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at.<br><br>Tempor id eu nisl nunc. At erat pellentesque adipiscing commodo elit. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Aliquam eleifend mi in nulla posuere. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Non nisi est sit amet facilisis magna etiam tempor orci. Volutpat blandit aliquam etiam erat. Imperdiet nulla malesuada pellentesque elit eget. Condimentum lacinia quis vel eros donec ac odio tempor orci. Sit amet justo donec enim. Habitant morbi tristique senectus et. In massa tempor nec feugiat nisl pretium fusce id. Posuere morbi leo urna molestie at. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Non tellus orci ac auctor augue mauris augue. Commodo elit at imperdiet dui accumsan sit amet. Sit amet volutpat consequat mauris. Enim blandit volutpat maecenas volutpat blandit aliquam.<br><br>Feugiat nisl pretium fusce id velit ut tortor. Ultricies mi quis hendrerit dolor magna. Et netus et malesuada fames. Magna fringilla urna porttitor rhoncus dolor purus non enim praesent. Sit amet risus nullam eget felis. Libero volutpat sed cras ornare. Quis varius quam quisque id diam vel quam elementum. Condimentum mattis pellentesque id nibh tortor id. In est ante in nibh mauris cursus mattis. At tellus at urna condimentum mattis pellentesque id. Arcu non odio euismod lacinia at. Rhoncus dolor purus non enim. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Dignissim enim sit amet venenatis urna cursus eget.';

export const makeSuggestion = (id, title, detail, createdDateTime, lastActivityDateTime, numUpvotes, numComments, upvotedByCurrentUser) => 
  ({ id, title, detail, createdDateTime, lastActivityDateTime, numUpvotes, numComments, upvotedByCurrentUser });

const testSuggestions = [ 
  makeSuggestion(0, 'Simplify Deployment Process - 1-Click Approval to Deploy', ipsum3, '5/27/21', '5/27/21', 26, 2, false),
  makeSuggestion(1, 'Create F# Web API Template', ipsum1, '5/29/21', '5/29/21', 8, 0, true),
  makeSuggestion(2, 'This Is An Example Very Very, Very, Very, Very, Very, Very, Very, Very, Very, Very Long Suggestion', ipsum3, '5/29/21', '5/29/21', 4, 1, false),
];

const localStorage = window.localStorage;
const getUserFromLocalStorage =  () => {
  const userId = localStorage.getItem('UserId');
  return !!userId ? ({ userId }) : null;
}
const initialUser = getUserFromLocalStorage();

const initialState = {
  currentView: 'Hottest',
  hottestSuggestions: [],
  suggestionDetail: {},
  user: initialUser
};

export const popupOpen = writable(false);
export const error = writable();

export const state = writable(initialState);
export const isLoggedIn = derived(state, $state => !!$state.user);
export const suggestionDetail = derived(state, $state => $state.suggestionDetail);
export const hottestSuggestions = derived(state, $state => $state.hottestSuggestions);
export const userId = derived(state, $state => !!$state.user ? $state.user.userId : null);
export default state; 