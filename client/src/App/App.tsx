import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Home from 'Home';
import TournamentForm from 'TournamentForm';
import { homeRoute, tournamentRoute } from 'utils/routes';

function App() {
  return (
    <Router>
      <RecoilRoot>
        <Switch>
          <Route path={homeRoute} exact>
            <Home />
          </Route>
          <Route path={tournamentRoute} exact>
            <TournamentForm />
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </RecoilRoot>
    </Router>
  );
}

export default App;
