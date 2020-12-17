import React from 'react';
import styled, { keyframes } from 'styled-components';

import Title from 'Title';
import { Navbar } from './components';

const blurIn = keyframes`
  from {
    filter: blur(0.5rem);
  }

  to {
    filter: blur(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw !important;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  color: white;
  font-family: Neon;
  box-sizing: border-box;
  padding: 80px 5vw;
  animation: ${blurIn} 0.5s linear;

  @media (min-width: 768px) {
    padding: 80px 10vw;
  }
`;

const Header = styled.div`
  text-align: center;
`;

const Body = styled.div`
  width: 100%;
  max-width: 600px;
`;

interface Props {
  children: React.ReactNode;
  title?: string;
  neon?: 'yellow' | 'blue';
}

export default function Layout(props: Props) {
  const { title, children, neon } = props;

  return (
    <Wrapper>
      <Navbar />
      <Container>
        <Header>
          <Title title={title ? title : undefined} secondary neon={neon} />
        </Header>
        <Body>{children}</Body>
      </Container>
    </Wrapper>
  );
}
