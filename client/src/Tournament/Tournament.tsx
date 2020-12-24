import React from 'react';
import { MatchProps } from './interfaces';

import Layout from './Layout';

export default function Tournament(props: MatchProps) {
  const type = props.match.params.tournament;
  const mode = props.match.params.mode;

  return <Layout>This is body</Layout>;
}
