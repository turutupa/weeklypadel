import React from 'react';
import styled from 'styled-components';

import { electricBlue, primary } from 'utils/colors';

const Sun = styled.div`
  width: 350px;
  height: 350px;
  background: linear-gradient(
    180deg,
    ${electricBlue} 0%,
    ${electricBlue} 20%,
    ${primary} 70%
  );
  border-radius: 50%;
  z-index: 2;
  margin: 0 auto;
  position: absolute;
  top: 20%;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  filter: opacity(0.8);
  mix-blend-mode: exclusion;
`;

const Lines = styled.div`
  width: 100%;
  height: 15%;
  position: relative;
  bottom: -15%;
  // border-radius: 0 0 50% 50%;
  overflow: hidden;
`;

const Line = styled.div`
  height: ${({ pos }: { pos: number }) => `calc(10px)`};
  width: 100%;
  background-color: rgba(15, 0, 25, 1);
  mix-blend-mode: normal;
  margin-bottom: 10px;
`;

function renderLines() {
  return new Array(9).fill(null).map((_, i: number) => {
    return <Line key={i + 'sun-line'} pos={i}></Line>;
  });
}

export default function SynthSun() {
  return (
    <Sun>
      <Lines>{renderLines()}</Lines>
    </Sun>
  );
}
