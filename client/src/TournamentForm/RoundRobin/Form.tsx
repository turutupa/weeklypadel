import React from 'react';
import styled from 'styled-components';

import { TextInput, Button, Dropdown } from 'Form';
import Players from '../components/Players';

const Container = styled.div``;

const TournamentForm = styled.form``;

export default function Form() {
  const [tournamentName, setTournamentName] = React.useState<string>('');
  const [players, setPlayers] = React.useState<string[]>(['']);

  function updatePlayerName(i: number, val: string) {
    let copyPlayers = [...players];
    copyPlayers[i] = val;
    setPlayers(copyPlayers);
  }

  function addNewPlayer() {
    if (players[players.length - 1]?.trim() !== '') {
      setPlayers([...players, '']);
    }
  }

  return (
    <>
      <TournamentForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextInput
          label='Tournament Name'
          value={tournamentName}
          callback={setTournamentName}
        />

        <Button
          onClick={() => {
            addNewPlayer();
          }}
        >
          Add Player
        </Button>
      </TournamentForm>
    </>
  );
}
