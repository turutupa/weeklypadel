import React from 'react';
import styled from 'styled-components';

const NeonCard = styled.div`
  min-height: 100%;
  flex-direction: column;
  color: white;
  font-family: Neon;
  width: 100%;
  margin-bottom: 80px;
`;

interface Props {
  children: React.ReactNode;
}

export default function InfoCard(props: Props) {
  return <NeonCard>{props.children}</NeonCard>;
}
