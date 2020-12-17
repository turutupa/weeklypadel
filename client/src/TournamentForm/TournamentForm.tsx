import React from 'react';
import styled from 'styled-components';

import Layout from 'Layout';
import { titles, neonColors } from './helpers';

import { useRecoilValue } from 'recoil';
import { tournamentType } from './formAtom';
import {
  SelectTournament,
  AddTournamentName,
  AddPlayers,
  Players,
  GenerateTournament,
} from './components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function TournamentForm() {
  const selectedTournamentType = useRecoilValue(tournamentType);

  return (
    <Layout
      title={titles[selectedTournamentType]}
      neon={neonColors[selectedTournamentType]}
    >
      <Body>
        <SelectTournament />
        <AddTournamentName />
        <AddPlayers />
        <GenerateTournament />
        <Players />
      </Body>
    </Layout>
  );
}

export default TournamentForm;
