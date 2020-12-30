import React from 'react';
import styled from 'styled-components';

import { primary } from 'utils/colors';

export const PlayerItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 10px 10px 25px;
  position: relative;
  box-shadow: -5px 0 ${primary};
  font-family: Neon;

  &:before {
    content: '${({ number }: { number: number }): string => `${number + 1}`}';
    color: ${primary};
    margin-right: 25px;
  }

  &:after {
    content: '';
  }

  &:hover:before {
    color: white;
  }

  &:hover {
    cursor: pointer;
    background-color: rgb(255, 41, 117, 0.5);
  }
`;

export default function renderPlayers(players: string[]): JSX.Element[] {
  return players.map((player, index) => {
    return (
      <PlayerItem number={index} key={player}>
        {player}
      </PlayerItem>
    );
  });
}
