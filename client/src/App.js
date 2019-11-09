import React from "react";
import Landing from "./pages/Landing";
import User from "./pages/User";
import Log from "./pages/Log";
import NoMatch from "./pages/NoMatch";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/user" component={User} />
          <Route exact path="/log" component={Log} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
