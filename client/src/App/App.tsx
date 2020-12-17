import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// initiate recoil
import { RecoilRoot } from 'recoil';

// containers
import Home from 'Home';
import TournamentForm from 'TournamentForm';
import Tournament from 'Tournament';

// routes
import {
  homeRoute,
  generateTournamentRoute,
  tournamentRoute,
} from 'utils/routes';

function App() {
  return (
    <Router>
      <RecoilRoot>
        <Switch>
          <Route path={homeRoute} exact component={Home} />
          <Route
            path={generateTournamentRoute}
            exact
            component={TournamentForm}
          />
          <Route path={tournamentRoute} component={Tournament} />
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </RecoilRoot>
    </Router>
  );
}

export default App;
