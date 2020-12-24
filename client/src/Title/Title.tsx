import React from 'react';

import styled from 'styled-components';
import { H1 } from 'Headers';
import { blueNeon, yellowNeon } from 'utils/colors';
import { siteName } from 'utils/constants';

const Header = styled(H1)`
  z-index: 99;
  user-select: none;
  margin-top: 20px !important;
  margin-left: -30px !important;

  transform: scale(0.5);

  @media (min-width: 768px) {
    margin-bottom: 0px;
    transform: scale(1);
    margin-bottom: 100px !important;
    margin-left: 0 !important;
  }
`;

const neonColors = {
  yellow: yellowNeon,
  blue: blueNeon,
};

const SecondaryHeader = styled.h2`
  ${({ neon }: { neon?: 'yellow' | 'blue' }) =>
    neon ? neonColors[neon] : '5px 5px grey'}
  font-family: RealNeon;
  transform: perspective(400px);

  font-size: 2rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export default function Title({
  title,
  secondary,
  neon,
}: {
  title?: string;
  secondary?: boolean;
  neon?: 'yellow' | 'blue';
}) {
  if (secondary) {
    return <SecondaryHeader neon={neon}>{title || siteName}</SecondaryHeader>;
  }
  return <Header>{title || siteName}</Header>;
}
