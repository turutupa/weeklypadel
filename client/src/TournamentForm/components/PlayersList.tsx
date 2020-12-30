import React from 'react';
import styled from 'styled-components';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  tournamentMode as tournamentModeAtom,
  players as playersAtom,
  teams as teamsAtom,
} from '../formAtom';
import { primary } from 'utils/colors';
import { handlePlayers, handleTeams, isFixedPairsGame } from '../formHelpers';

const PlayersList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 0px;
`;

const TeamsList = styled(PlayersList)``;

const Li = styled.li`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
  padding: 10px 10px 10px 25px;
  position: relative;
  box-shadow: -5px 0 ${primary};

  &:before {
    content: '${({
      number,
      isTeam,
    }: {
      number: number;
      isTeam: boolean;
    }): string => `${isTeam ? 'Team ' + (number + 1) : number + 1}`}';
    color: ${primary};
    margin-right: 15px;
  }

  &:hover:before {
    color: white;
  }

  &:hover {
    background-color: rgb(255, 41, 117, 0.5);
  }
`;

const Label = styled.div``;

const DeleteButton = styled.div`
  cursor: pointer;
  &:hover {
    filter: brightness(0.7);
  }
`;

export default function Players(): JSX.Element {
  const [players, setPlayers] = useRecoilState(playersAtom);
  const [teams, setTeams] = useRecoilState(teamsAtom);
  const tournamentMode = useRecoilValue(tournamentModeAtom);

  function handleDeletePlayer(index: number): void {
    const removedPlayer = players[index];

    setPlayers(handlePlayers.removePlayer(removedPlayer));
  }

  function handleDeleteTeam(index: number): void {
    setTeams(handleTeams.removeTeam(index));
  }

  function renderPlayerList(): JSX.Element[] {
    return players.map((player, i) => {
      return (
        <Li
          number={i}
          key={player}
          isTeam={false}
          style={{ marginBottom: '10px' }}
        >
          <Label>{player}</Label>
          <DeleteButton
            onClick={() => {
              handleDeletePlayer(i);
            }}
          >
            🗑
          </DeleteButton>
        </Li>
      );
    });
  }

  function renderTeamsList(): JSX.Element[] {
    return teams.map((team, index) => {
      const [playerOne, playerTwo] = team;
      return (
        <TeamsList key={playerOne + ' ' + playerTwo}>
          <Li number={index} key={playerOne} isTeam>
            {playerOne}
            <br />
            {playerTwo}
            <DeleteButton
              onClick={() => {
                handleDeleteTeam(index);
              }}
            >
              🗑
            </DeleteButton>
          </Li>
        </TeamsList>
      );
    });
  }

  if (isFixedPairsGame(tournamentMode)) return <>{renderTeamsList()}</>;
  return <PlayersList>{renderPlayerList()}</PlayersList>;
}
