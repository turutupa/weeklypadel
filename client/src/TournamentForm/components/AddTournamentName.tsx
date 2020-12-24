import React from 'react';

import { useRecoilState } from 'recoil';
import { tournamentName as tournamentNameAtom } from '../formAtom';
import { TextInput } from 'Form';

export default function AddPlayers() {
  const [tournamentName, setTournamentName] = useRecoilState(
    tournamentNameAtom
  );
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    if (tournamentName.length < 3) {
      setError('Name must be at least 3 chars long');
    } else {
      setError('');
    }
  }, [tournamentName]);

  return (
    <>
      <TextInput
        label='Tournament Name'
        value={tournamentName}
        callback={setTournamentName}
        error={error}
      />
    </>
  );
}
