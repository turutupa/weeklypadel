import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'Form';
import { primary } from 'utils/colors';

import {
  tournamentNameMinLength,
  tournamentMinNumberPlayers,
} from '../helpers';
import { useRecoilValue } from 'recoil';
import {
  tournamentType as tournamentTypeAtom,
  tournamentMode as tournamentModeAtom,
  tournamentName as tournamentNameAtom,
  players as playersAtom,
} from '../formAtom';

export default function GenerateTournament() {
  const tournamentType = useRecoilValue(tournamentTypeAtom);
  const tournamentMode = useRecoilValue(tournamentModeAtom);
  const name = useRecoilValue(tournamentNameAtom);
  const players = useRecoilValue(playersAtom);

  const to = `/tournament/${tournamentType}/${tournamentMode}`;
  const stay = `/create`;

  function formIsCorrect(): boolean {
    const nameIsCorrect = name.length > tournamentNameMinLength;
    const playersIsCorrect = players.length >= tournamentMinNumberPlayers;

    return nameIsCorrect && playersIsCorrect;
  }

  function handleTo(): string {
    if (formIsCorrect()) return to;
    else return stay;
  }

  return (
    <Link to={handleTo}>
      <Button color='white' bg={primary} solid type='submit'>
        Generate Tournament
      </Button>
    </Link>
  );
}
