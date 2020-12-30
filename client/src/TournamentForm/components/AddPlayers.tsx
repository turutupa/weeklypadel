import React from 'react';

import { TextInput, Button } from 'Form';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  players as playersAtom,
  tournamentMode as tournamentModeAtom,
} from '../formAtom';
import {
  tournamentMinNumberPlayers,
  minNumberOfPlayersErrorMsg,
  playerNameWithoutSpaces,
  handlePlayers,
  PlayerHandler,
} from '../formHelpers';

export default function AddPlayers() {
  const [players, setPlayers] = useRecoilState(playersAtom);
  const [playerName, setPlayerName] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const setPlayerNameWithoutSpaces = playerNameWithoutSpaces(setPlayerName);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      setPlayers(handlePlayers.addPlayer(playerName));
      setPlayerName('');
    } catch (e) {
      setError(e);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <TextInput
        label={`Player #${players.length + 1}`}
        value={playerName}
        callback={setPlayerNameWithoutSpaces}
        error={error}
      />

      <Button>Add Player</Button>
    </form>
  );
}
