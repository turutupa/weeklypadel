import React from 'react';
// @ts-ignore
import styled from 'styled-components';
import Neon from 'Neon';
import { generateTournamentRoute } from 'utils/routes';

const NeonWrapper = styled.div`
  z-index: 4;
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  max-height: 500px;

  margin-top: 10%;

  flex-direction: column;
  align-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    margin-top: calc(1%);
  }
`;

export default function TournamentSelection() {
  return (
    <NeonWrapper>
      <Neon top='Generate' bottom='Tournament' to={generateTournamentRoute} />
    </NeonWrapper>
  );
}
