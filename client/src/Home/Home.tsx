import React from 'react';

import {
  Grid,
  SiteDescription,
  CreateTournamentNeon,
  TournamentsDescription,
} from './components';
import Title from 'Title';

import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh !important;
  max-width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Welcome() {
  return (
    <>
      <Wrapper>
        <Grid />
        <Title />
        <SiteDescription />
        <CreateTournamentNeon />
      </Wrapper>
      <TournamentsDescription />
    </>
  );
}
