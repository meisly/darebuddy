import React, { useState } from "react";
import Landing from "./pages/Landing";
import NavBar from "./components/Navbar";
import User from "./pages/User";
import Log from "./pages/Log";
import NoMatch from "./pages/NoMatch";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from "./utils/API";
require("./index.css");

const ACCESS_TOKEN_KEY = 'darebuddy-access-token';

function App() {
  const { loading, getTokenSilently, isAuthenticated, user } = useAuth0();

  const [token, setToken] = useState();
  const [userData, setUserData] = useState(null);

  if (!loading) {
    if (!token) {
      getTokenSilently().then((token) => {
        setToken(token);
        localStorage.setItem(ACCESS_TOKEN_KEY, token)
      });
    }
    if (isAuthenticated && !userData) {
      API.getUser(user).then(res => {
        setUserData(res.data);
      })
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
          <Route exact path="/"
            render={() => <Landing userData={userData}/>} />
          <PrivateRoute exact path="/user"
            render={() =>  <User userData={userData}/> }
          />
          <PrivateRoute exact path="/log" 
          render={() => <Log userData={userData}/> }
           />
          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
