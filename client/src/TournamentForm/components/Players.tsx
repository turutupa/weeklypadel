import React from 'react';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { players as playersAtom } from '../formAtom';
import { primary } from 'utils/colors';

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Li = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 10px 10px 25px;
  position: relative;
  box-shadow: -5px 0 ${primary};

  &:before {
    content: '${({ number }: { number: number }): string => `${number + 1}`}';
    color: ${primary};
    margin-right: 25px;
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

  function handleDeletePlayer(index: number) {
    let newPlayersList = [...players];
    newPlayersList.splice(index, 1);

    setPlayers(newPlayersList);
  }

  function renderPlayerList(): JSX.Element[] {
    return players.map((player, i) => {
      return (
        <Li number={i} key={player}>
          <Label>{player}</Label>
          <DeleteButton
            onClick={() => {
              handleDeletePlayer(i);
            }}
          >
            Delete
          </DeleteButton>
        </Li>
      );
    });
  }

  return <Ul>{renderPlayerList()}</Ul>;
}
