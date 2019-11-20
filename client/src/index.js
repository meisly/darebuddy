// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./config/auth_config.js";

let confige = config.production;

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={confige.domain}
    client_id={confige.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={confige.audience} 
    >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();