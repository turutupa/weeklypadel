import React from 'react';
import styled from 'styled-components';

import { primary } from 'utils/colors';

export const TeamItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

function convertPlayersToTeams(players: string[]): string[][] {
  let teams: string[][] = [];
  let counter = 0;
  let currentTeam: string[] = [];
  for (let i = 0; i < players.length; i++) {
    currentTeam = [...currentTeam, players[i]];
    if (counter === 1) {
      teams = [...teams, currentTeam];
      currentTeam = [];
      counter = 0;
    } else {
      counter = 1;
    }
  }

  return teams;
}

export default function renderTeams(players: string[]): JSX.Element[] {
  const teams = convertPlayersToTeams(players);

  return teams.map((team, index) => {
    return (
      <TeamItem number={index} key={team.join()}>
        {team[0]}
        <br />
        {team[1]}
      </TeamItem>
    );
  });
}
