import React from 'react';

import { TextInput, Button } from 'Form';
import { useRecoilState } from 'recoil';
import { players as playersAtom } from '../formAtom';

export default function AddPlayers() {
  const [players, setPlayers] = useRecoilState(playersAtom);
  const [playerName, setPlayerName] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const playerNameWithoutSpaces = (val: string) =>
    setPlayerName(val.split(' ').join(''));

  function addNewPlayer() {
    const player = playerName.trim();
    if (player === '') return;

    const copyPlayers: Set<string> = new Set(players);

    if (copyPlayers.has(player)) {
      setError(`Player ${player} already exists`);
    } else {
      setPlayers([...players, player]);
      setError('');
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
      <TextInput
        label={`Player name #${players.length + 1}`}
        value={playerName}
        callback={playerNameWithoutSpaces}
        error={error}
      />
      <Button>Add Player</Button>
    </form>
  );
}
