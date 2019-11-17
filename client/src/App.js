import React, { useState } from "react";
import Landing from "./pages/Landing";
import NavBar from "./components/Navbar";
import User from "./pages/User";
import Log from "./pages/Log";
import NoMatch from "./pages/NoMatch";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const ID_TOKEN_KEY = 'darebuddy-id-token';
const ACCESS_TOKEN_KEY = 'darebuddy-access-token';

function App() {
  const { loading, getTokenSilently } = useAuth0();

  const [token, setToken] = useState();
  if (!loading) {

    if (!token) {
      getTokenSilently().then((token) => {
        setToken(token);
        localStorage.setItem(ACCESS_TOKEN_KEY, token)
      });
    }

  }

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <Router>
      <div>
        <header>
          <NavBar />
        </header>

        <Switch>
          <Route exact path="/" />
          <PrivateRoute exact path="/user" component={User} />
          <PrivateRoute exact path="/log" component={Log} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
