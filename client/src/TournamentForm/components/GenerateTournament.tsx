import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'Form';
import { primary } from 'utils/colors';

import {
  tournamentNameMinLength,
  tournamentMinNumberPlayers,
  tournamentMinNumberTeams,
  isFixedPairsGame,
} from '../formHelpers';
import { useRecoilValue } from 'recoil';
import {
  tournamentType as tournamentTypeAtom,
  tournamentMode as tournamentModeAtom,
  tournamentName as tournamentNameAtom,
  players as playersAtom,
  teams as teamsAtom,
} from '../formAtom';

import { TOURNAMENT_NAME_URL_QUERY, PLAYERS_URL_QUERY } from 'utils/constants';

export default function GenerateTournament() {
  const tournamentType = useRecoilValue(tournamentTypeAtom);
  const tournamentMode = useRecoilValue(tournamentModeAtom);
  const tournamentName = useRecoilValue(tournamentNameAtom);
  const players = useRecoilValue(playersAtom);
  const teams = useRecoilValue(teamsAtom);
  const [to, setTo] = React.useState<string>('');
  const stay = `/create`;

  React.useEffect(() => {
    const playersUri = isFixedPairsGame(tournamentMode)
      ? teams.join()
      : players.join();
    setTo(
      `/tournament/${tournamentType}/${tournamentMode}?${TOURNAMENT_NAME_URL_QUERY}=${tournamentName}&${PLAYERS_URL_QUERY}=${playersUri}`
    );
  });

  function hasEnoughPlayers(): boolean {
    return players.length >= tournamentMinNumberPlayers;
  }

  function hasEnoughTeams(): boolean {
    return teams.length >= tournamentMinNumberTeams;
  }

  function formIsCorrect(): boolean {
    const hasCorrectName = tournamentName.length >= tournamentNameMinLength;

    if (isFixedPairsGame(tournamentMode)) {
      return hasCorrectName && hasEnoughTeams();
    }

    return hasCorrectName && hasEnoughPlayers();
  }

  function handleTo(): string {
    if (formIsCorrect()) return to;
    else return stay;
  }

  return (
    <Link to={handleTo}>
      <Button
        color='white'
        bg={primary}
        solid
        type='submit'
        disabled={!formIsCorrect()}
      >
        Generate Tournament
      </Button>
    </Link>
  );
}
