import React from 'react';
import styled from 'styled-components';

const Sun = styled.div`
  width: 350px;
  height: 350px;
  background: linear-gradient(180deg, #faf09d 0%, #fc9093 52.08%, #e92077 70%);
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
  height: 50%;
  position: relative;
  bottom: -20%;
  border-radius: 0 0 50% 50%;
  overflow: hidden;
`;

const Line = styled.div`
  height: ${({ pos }: { pos: number }) => `calc(5px * ${pos})`};
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  mix-blend-mode: overlay;
  margin-bottom: 1rem;
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
