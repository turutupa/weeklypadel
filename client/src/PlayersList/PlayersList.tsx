import React from 'react';
import styled from 'styled-components';

import { primary } from 'utils/colors';
import renderPlayers from './renderPlayers';
import renderTeams from './renderTeams';
import { isFixedPairsGame } from '../TournamentForm/formHelpers';

const Title = styled.h3`
  color: white;
  cursor: pointer;

  &:before {
    content: '${({ isCollapsed }: { isCollapsed: boolean }) =>
      isCollapsed ? '+' : '-'}';
    color: ${primary};
    padding-right: 10px;
    font-weight: 900;
  }

  &:hover {
    filter: brightness(1.4);
  }
`;

const List = styled.ul`
  display: ${({ isCollapsed }: { isCollapsed: boolean }) =>
    isCollapsed ? 'none' : 'block'};
  list-style: none;
  color: white;
  padding-left: 0;
  text-align: center;
`;

const Hr = styled.hr`
  margin-top: 50px;
  margin-bottom: 10px;
`;

interface Props {
  players: string[];
  tournamentMode: string;
}

export default function PlayersList(props: Props) {
  const { players, tournamentMode } = props;
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  function handleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div>
      {!isFixedPairsGame(tournamentMode) && (
        <React.Fragment>
          <Title isCollapsed={isCollapsed} onClick={handleCollapse}>
            Players{' '}
            <span style={{ color: 'gray', fontSize: '1rem' }}>
              {isCollapsed ? '(show)' : '(hide)'}
            </span>
          </Title>
          <List isCollapsed={isCollapsed}>
            {players && renderPlayers(players)}
          </List>
        </React.Fragment>
      )}
      {isFixedPairsGame(tournamentMode) && (
        <React.Fragment>
          <Title isCollapsed={isCollapsed} onClick={handleCollapse}>
            Teams{' '}
          </Title>
          <List isCollapsed={isCollapsed}>{renderTeams(players)}</List>
        </React.Fragment>
      )}

      <Hr />
    </div>
  );
}
