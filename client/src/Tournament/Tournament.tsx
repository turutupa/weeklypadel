import React from 'react';
import { MatchProps } from './interfaces';
import { Redirect, useLocation } from 'react-router-dom';

import {
  TOURNAMENT_NAME_URL_QUERY,
  PLAYERS_URL_QUERY,
  ROUND_ROBIN,
  BRACKETS,
} from 'utils/constants';
import { errorRoute } from 'utils/routes';

import Layout from './Layout';
import RoundRobin from 'RoundRobinTournament';
import Brackets from 'BracketsTournament';

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

export default function Tournament(props: MatchProps) {
  const tournamentType = props.match.params.tournament;
  const tournamentMode = props.match.params.mode;
  const query = useQuery();

  const tournamentName = query.get(TOURNAMENT_NAME_URL_QUERY);
  const players = query.get(PLAYERS_URL_QUERY);

  React.useEffect(() => {
    try {
      // scroll to top on page load
      window && window.scroll(0, 0);
    } catch (e) {}
  }, []);

  // first make sure  user passed Tournament Name and Players
  if (!tournamentName || !players) return <Redirect to={errorRoute} />;

  return (
    <Layout title={tournamentName} tournamentType={tournamentType}>
      {tournamentType === ROUND_ROBIN && (
        <RoundRobin
          mode={tournamentMode}
          players={players}
          tournamentName={tournamentName}
        />
      )}
      {tournamentType === BRACKETS && <Brackets />}
    </Layout>
  );
}
