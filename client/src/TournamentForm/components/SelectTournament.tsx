import React from 'react';
import styled from 'styled-components';

import { tournamentTypes, tournamentModes } from '../helpers';

import { useRecoilState } from 'recoil';
import { tournamentType, tournamentMode } from '../formAtom';
import { Dropdown } from 'Form';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function TournamentForm() {
  const [selectedTournamentType, setTournamentType] = useRecoilState(
    tournamentType
  );
  const [_, setTournamentMode] = useRecoilState(tournamentMode);

  function setTournament(val: string) {
    setTournamentType(val);
    setTournamentMode(tournamentModes[val][0].value);
  }

  return (
    <>
      <Dropdown
        label='Tournament type'
        options={tournamentTypes}
        callback={setTournament}
      />
      <Dropdown
        label='Tournament Mode'
        options={tournamentModes[selectedTournamentType]}
        callback={setTournamentMode}
      />
    </>
  );
}

export default TournamentForm;
