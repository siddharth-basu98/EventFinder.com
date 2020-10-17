import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import Home from './Components/Home'
import EventAdd from "./Components/Event/EventAdd"

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import Header from './Components/Header';
import EventEdit from './Components/Event/EventEdit';
import EventList from './Components/Event/EventList';
import EventDetail from './Components/Event/EventDetails';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/event-add" component={EventAdd} />
          <PrivateRoute path="/event-edit/:id" component={EventEdit} />
          <PrivateRoute path="/events" component={EventList} />
          <PrivateRoute path="/event-detail/:id" component={EventDetail} />
        </Switch>
    </Router>
  );
}

export default App;
