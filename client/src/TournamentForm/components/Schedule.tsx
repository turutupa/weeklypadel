import React from 'react';
import styled from 'styled-components';
import { Match } from 'utils/tournament';

const Container = styled.div`
  width: 100%;
`;

const Round = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
  text-align: center;
`;

const MatchCard = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  width: 100%;
  margin: 0 10px;
  background-color: rgb(110, 156, 225, 0.3);
`;

const Subtle = styled.span`
  color: grey;
  font-size: 18px;
`;

export default function Schedule(schedule: Match[][]) {
  return schedule.map((round, roundNumber) => {
    roundNumber = roundNumber + 1;

    return (
      <Container key={`round-${roundNumber}`}>
        <h1 style={{ fontWeight: 'bold' }}>Round {roundNumber}</h1>
        <Round>
          {round.map((match) => {
            const { local, visitor } = match.getTeams();

            const firstLocal = local[0].name;
            const secondLocal = local[1].name;
            const firstVisitor = visitor[0].name;
            const secondVisitor = visitor[1].name;

            return (
              <MatchCard
                key={`${firstLocal} ${secondLocal} ${firstVisitor} ${secondVisitor}`}
              >
                {firstLocal} <Subtle>&</Subtle> {secondLocal}
                <p style={{ fontWeight: 'bold' }}>VS</p>
                {firstVisitor} <Subtle>&</Subtle> {secondVisitor}
              </MatchCard>
            );
          })}
        </Round>
      </Container>
    );
  });
}
