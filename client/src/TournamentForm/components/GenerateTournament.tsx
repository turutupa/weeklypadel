import React from 'react';
import styled from 'styled-components';

import { Button } from 'Form';
import { primary } from 'utils/colors';

export default function GenerateTournament() {
  return (
    <Button color='white' bg={primary} solid>
      Generate Tournament
    </Button>
  );
}
