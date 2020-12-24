import React from 'react';

import {
  Sun,
  Grid,
  SiteDescription,
  CreateTournamentNeon,
  TournamentsDescription,
} from './components';

import Navbar from 'Navbar';
import Title from 'Title';

import styled from 'styled-components';

const Wrapper = styled.div`
  // margin-top: 60px;
  min-height: calc(100vh) !important;
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
      {/* <Navbar /> */}
      <Wrapper>
        <Sun />
        <Grid />
        <Title />
        <SiteDescription />
        <CreateTournamentNeon />
      </Wrapper>
      <TournamentsDescription />
    </>
  );
}
