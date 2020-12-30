import Player from './Player';
import Match from './Match';

export interface Tournament {
  schedule(): Match[][];
  addPlayers(players: string[] | [string, string][]): void;
  // addTeams?(teams: [string, string][]): void;
}

// export type TournamentModes = 'rotatingPairs' | 'fixedTeams';
export enum TournamentModes {
  rotatingPairs = 'rotatingPairs',
  fixedTeams = 'fixedTeams',
}

export type Team = [Player, Player];
export type Players = Map<string, Player>;

export interface Teams {
  local: [Player, Player];
  visitor: [Player, Player];
}

export interface Results {
  wins: number;
  loses: number;
  points: number;
}
