import React from 'react';
import { Redirect } from 'react-router-dom';

import { errorRoute } from 'utils/routes';
import { isIncorrectModeType, playersToPlayersList } from './helpers';
import { Tournament, Player, Match } from '../utils/tournament';
import { ROUND_ROBIN_FREE_FOR_ALL, ROUND_ROBIN_CLASSIC } from 'utils/constants';

import PlayersList from 'PlayersList';
import { Schedule } from './components';

interface Props {
  mode: string;
  tournamentName: string;
  players: string;
}

export default function RoundRobin(props: Props) {
  const { mode, players, tournamentName } = props;
  const [tournament, setTournament] = React.useState<Tournament>(null!);
  const [schedule, setSchedule] = React.useState<Match[][]>(null!);

  const playersList = playersToPlayersList(players);

  React.useEffect(() => {
    setTournament(Tournament.roundRobin(tournamentName));
    tournament.addPlayers(playersList);
    if (mode === ROUND_ROBIN_FREE_FOR_ALL) {
      setSchedule(tournament.rotatingTeams());
    } else {
      setSchedule(tournament.fixedTeams());
    }
  }, []);

  if (isIncorrectModeType(mode)) return <Redirect to={errorRoute} />;

  return (
    <>
      <PlayersList players={playersList} tournamentMode={mode} />
      <Schedule schedule={schedule} />
    </>
  );
}
