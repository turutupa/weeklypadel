import React from 'react';
import { MatchProps } from './interfaces';

export default function Tournament(props: MatchProps) {
  const tournamentType = props.match.params.tournament;

  return <div style={{ color: 'white' }}>Tournament {tournamentType}</div>;
}
