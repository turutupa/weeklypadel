import React from 'react';
import styled from 'styled-components';

import Layout from './Layout';
import { titles, neonColors } from './helpers';
import { isFixedPairsGame } from './formHelpers';
import { ROUND_ROBIN } from 'utils/constants';

import { useRecoilState, useRecoilValue } from 'recoil';
import { tournamentType, tournamentMode } from './formAtom';
import {
  SelectTournament,
  AddTournamentName,
  AddPlayers,
  AddTeams,
  PlayersList,
  GenerateTournament,
} from './components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function TournamentForm() {
  const [selectedTournamentType, setTournamentType] = useRecoilState(
    tournamentType
  );

  const selectedTournamentMode = useRecoilValue(tournamentMode);

  React.useEffect(() => {
    return () => {
      setTournamentType(ROUND_ROBIN);
    };
  }, []);

  return (
    <Layout
      title={titles[selectedTournamentType]}
      neon={neonColors[selectedTournamentType]}
    >
      <Body>
        <SelectTournament />
        <AddTournamentName />
        {isFixedPairsGame(selectedTournamentMode) ? (
          <AddTeams />
        ) : (
          <AddPlayers />
        )}
        <GenerateTournament />
        <PlayersList />
      </Body>
    </Layout>
  );
}

export default TournamentForm;
