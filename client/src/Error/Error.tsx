import React from 'react';
import styled from 'styled-components';

import Navbar from 'Navbar';

import { primary } from 'utils/colors';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  color: white;
  font-family: Commando;
`;

const P = styled.p`
  margin-bottom: 0px;
  margin-top: 20px;
  text-shadow: 3px 3px ${primary};
  padding: 0 10px;
  box-size: border-box;
`;

export default function Error() {
  return (
    <Container>
      <Navbar />
      <P>Error404</P>
      <P style={{ fontSize: '2.5rem' }}>Hasta la vista, Baby.</P>
    </Container>
  );
}
