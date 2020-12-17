import React from 'react';

import { useRecoilState } from 'recoil';
import { tournamentName as tournamentNameAtom } from '../formAtom';
import { TextInput } from 'Form';

export default function AddPlayers() {
  const [tournamentName, setTournamentName] = useRecoilState(
    tournamentNameAtom
  );

  return (
    <>
      <TextInput
        label='Tournament Name'
        value={tournamentName}
        callback={setTournamentName}
      />
    </>
  );
}
