import React from 'react';
import styled from 'styled-components';

import { Match } from '../../utils/tournament';

const MatchItem = styled.div``;

const Team = styled.div``;

interface Props {
  schedule: Match[][];
}

function renderSchedule(schedule: Match[][]) {
  return schedule.map((round, index) => {
    return round.map((match, i) => {
      const [localOne, localTwo] = match.getTeams().local;
      const [visitorOne, visitorTwo] = match.getTeams().visitor;

      const locals = match.getTeams().local.join();
      const visitors = match.getTeams().local.join();

      return (
        <MatchItem key={locals + visitors}>
          <Team>
            {localOne}
            <br />
            {localTwo}
          </Team>
          <Team>
            {visitorOne}
            <br />
            {visitorTwo}
          </Team>
        </MatchItem>
      );
    });
  });
}

export default function Schedule({ schedule }: Props): JSX.Element[][] {
  return renderSchedule(schedule);
}
