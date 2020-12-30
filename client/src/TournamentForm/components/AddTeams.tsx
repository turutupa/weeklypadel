import React from 'react';
import styled from 'styled-components';

import {
  tournamentMinNumberTeams,
  minNumberOfTeamsErrorMsg,
  playerNameWithoutSpaces,
  handleTeams,
} from '../formHelpers';

import { Button, TextInput } from 'Form';
import { useRecoilState } from 'recoil';
import { teams as teamsAtom } from '../formAtom';

const Label = styled.div`
  font-size: 0.8rem;
  font-family: Commando;
  color: white;
  margin-bottom: 5px;
  margin-top: 5px;
`;

interface FormProps {
  children: React.ReactNode;
  callback: (...args: any) => void;
}

const Form = function (props: FormProps) {
  const { children, callback } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        callback();
      }}
    >
      {children}
    </form>
  );
};

export default function AddTeam() {
  const [teams, setTeams] = useRecoilState(teamsAtom);
  const [playerOneName, setPlayerOneName] = React.useState<string>('');
  const [playerTwoName, setPlayerTwoName] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const setPlayerOneWithoutSpaces = playerNameWithoutSpaces(setPlayerOneName);
  const setPlayerTwoWithoutSpaces = playerNameWithoutSpaces(setPlayerTwoName);

  React.useEffect(() => {
    handleNumberOfTeamsError();
  }, [teams]);

  function handleNumberOfTeamsError(): void {
    if (teams.length >= tournamentMinNumberTeams) {
      setError('');
    } else {
      setError(minNumberOfTeamsErrorMsg);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    try {
      setTeams(handleTeams.addTeam([playerOneName, playerTwoName]));
      setPlayerOneName('');
      setPlayerTwoName('');
    } catch (e) {
      setError(e);
    }
  }

  return (
    <React.Fragment>
      <Label>Team #{teams.length + 1}</Label>
      <Form callback={handleSubmit}>
        <TextInput
          value={playerOneName}
          callback={setPlayerOneWithoutSpaces}
          placeholder='Player #1'
        />
      </Form>
      <Form callback={handleSubmit}>
        <TextInput
          value={playerTwoName}
          callback={setPlayerTwoWithoutSpaces}
          error={error}
          placeholder='Player #2'
        />
      </Form>
      <Button onClick={handleSubmit}>Add Team</Button>
    </React.Fragment>
  );
}
