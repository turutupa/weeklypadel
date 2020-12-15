import React from 'react';
import styled from 'styled-components';

import Layout from 'Layout';
import RoundRobin from './RoundRobin';
import Brackets from './Brackets';
import { tournamentOptions, titles, neonColors } from './helpers';

import { useRecoilState } from 'recoil';
import { tournamentType } from './atom';
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
  let activeForm = RoundRobin;

  switch (selectedTournamentType) {
    case 'roundrobin':
      activeForm = RoundRobin;
      break;
    case 'brackets':
      activeForm = Brackets;
      break;
  }

  return (
    <Layout
      title={titles[selectedTournamentType]}
      neon={neonColors[selectedTournamentType]}
    >
      <Body>
        <Dropdown
          label='Tournament type'
          options={tournamentOptions}
          callback={setTournamentType}
        />
        <Dropdown label='Tournament Mode' options={[]} />
        {activeForm()}
      </Body>
    </Layout>
  );
}

export default TournamentForm;
