import React from 'react';
import styled from 'styled-components';

import Navbar from 'Navbar';
import { sunset } from 'utils/colors';

const Container = styled.div``;

const Body = styled.section`
  margin: 100px 5vw;

  @media (min-width: 768px) {
    margin: 80px 20vw;
  }
`;

const Title = styled.h1`
  font-family: Commando;
  font-size: 2rem;
  color: white;
`;

const TitleSpan = styled.span`
  font-size: 1.4rem !important;
  color: ${sunset};
`;

interface Props {
  children?: React.ReactNode;
  title?: string;
  tournamentType?: string;
}

export default function Layout({ children, title, tournamentType }: Props) {
  return (
    <Container>
      <Navbar />
      <Body>
        <Title>
          {title} <TitleSpan>{tournamentType}</TitleSpan>
        </Title>

        {children}
      </Body>
    </Container>
  );
}
