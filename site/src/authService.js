import createAuth0Client from "@auth0/auth0-spa-js";
import state, { popupOpen } from "./Store/index";
import config from "../auth_config";

const localStorage = window.localStorage;
const namespace = 'http://voiceoftheengineers.netlify.app/user_authorization';

const getUser = async (client) => {
  let user = await client.getUser();
  console.log("user: ", user);

  if(user){
    user.userId = user[namespace].userId;
    delete user[namespace];
    localStorage.setItem('UserId', user.userId);
  }

  return user;
};

const handeCreateClient = async () => {
  let client = await auth.createClient();
  let user = await getUser(client);

  state.update( s => ({ ...s, user: user}));

  return client;
};

const createClient = async () => {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });

  return auth0Client;
};

const loginWithPopup = async (client, options) => {
  popupOpen.set(true);
  
  try {
    await client.loginWithPopup(options);
    let user = await getUser(client);

    state.update( s => ({ ...s, user: user}));

  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
};

const logout = (client) => {
  return client.logout();
};

const auth = {
  handeCreateClient,
  createClient,
  loginWithPopup,
  logout
};

export default auth;