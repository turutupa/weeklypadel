import React from 'react';
import { Redirect } from 'react-router-dom';

// helpers
import { errorRoute } from 'utils/routes';
import { isIncorrectModeType, playersStringToPlayersList } from './helpers';
import { Tournament } from '../utils/tournament';
import {
  ROUND_ROBIN_FREE_FOR_ALL,
  // ROUND_ROBIN_CLASSIC,
  TournamentModes,
} from 'utils/constants';

// recoil
import { useRecoilState } from 'recoil';
import { tournament as tournamentAtom } from './tournamentAtom';

// components
import PlayersList from 'PlayersList';
// import { Schedule } from './components';

/*
  !!! IMPORTANT !!!

  I don't like what I have done but:

  Incongruencies:
  - players list is rendered directly from players string // faster loading, but no player details...
  - schedule is rendered leveraging tournament // 

  Change that so we can sort them by wins/losses
*/

interface Props {
  mode: string;
  tournamentName: string;
  players: string;
}

export default function RoundRobin(props: Props) {
  const { mode, players, tournamentName } = props;
  const [tournament, setTournament] = useRecoilState<Tournament | null>(
    tournamentAtom
  );

  const playersList = playersStringToPlayersList(players);

  // console.log(tournament);

  // initiate roundrobin tournament
  React.useEffect(() => {
    if (mode === ROUND_ROBIN_FREE_FOR_ALL) {
      const newTournament = Tournament.roundRobin(
        tournamentName,
        TournamentModes.rotatingPairs
      );
      newTournament.addPlayers(playersList);
      setTournament(newTournament);
      console.log(newTournament.schedule());
    } else {
      // setTournament(Tournament.roundRobin(tournamentName, TournamentModes.fixedTeams));
      // setSchedule(tournament.schedule());
    }
  }, []);

  if (isIncorrectModeType(mode)) return <Redirect to={errorRoute} />;
  return (
    <>
      <PlayersList players={playersList} tournamentMode={mode} />
      {/* <Schedule /> */}
    </>
  );
}
