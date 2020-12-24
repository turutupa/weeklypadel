import React from 'react';
import styled from 'styled-components';

import Navbar from 'Navbar';

const Container = styled.div``;

interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Container>
      <Navbar />
    </Container>
  );
}
