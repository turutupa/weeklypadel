import React from 'react';

import { TextInput, Button } from 'Form';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  players as playersAtom,
  tournamentMode as tournamentModeAtom,
} from '../formAtom';
import { tournamentMinNumberPlayers, fixedTeamsGame } from '../helpers';

export default function AddPlayers() {
  const [players, setPlayers] = useRecoilState(playersAtom);
  const tournamentMode = useRecoilValue(tournamentModeAtom);
  const [playerName, setPlayerName] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const minNumberOfPlayersErrorMsg = 'At least 4 players are required';

  const playerNameWithoutSpaces = (val: string) => setPlayerName(val.trim());

  React.useEffect(() => {
    handleNumberOfPlayersError();
  }, [players]);

  function handleNumberOfPlayersError(): void {
    if (players.length >= tournamentMinNumberPlayers) {
      setError('');
    } else {
      setError(minNumberOfPlayersErrorMsg);
    }
  }

  function addNewPlayer() {
    const player = playerName.trim();
    if (player === '') return;

    const copyPlayers: Set<string> = new Set(players);

    if (copyPlayers.has(player)) {
      setError(`Player ${player} already exists`);
    } else {
      const newPlayersList: string[] = [...players, player];
      setPlayers(newPlayersList);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addNewPlayer();
        setPlayerName('');
      }}
    >
      {fixedTeamsGame(tournamentMode) && (
        <>
          <TextInput
            label={`Player #${players.length + 1}`}
            value={playerName}
            callback={playerNameWithoutSpaces}
            error={error}
          />
          <TextInput
            label={`Player  #${players.length + 1}`}
            value={playerName}
            callback={playerNameWithoutSpaces}
            error={error}
          />
        </>
      )}

      <Button>Add Player</Button>
    </form>
  );
}
