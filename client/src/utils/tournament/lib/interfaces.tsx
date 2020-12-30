import Player from './Player';

export interface Results {
  wins: number;
  loses: number;
  points: number;
}

export interface Teams {
  local: [Player, Player];
  visitor: [Player, Player];
}

export type Team = [Player, Player];
