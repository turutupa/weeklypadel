import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'Form';
import { primary } from 'utils/colors';

import { useRecoilValue } from 'recoil';
import { tournamentType as tournamentTypeAtom } from '../formAtom';

export default function GenerateTournament() {
  const tournamentType = useRecoilValue(tournamentTypeAtom);

  return (
    <Link to={`/tournament/${tournamentType}`}>
      <Button color='white' bg={primary} solid>
        Generate Tournament
      </Button>
    </Link>
  );
}
