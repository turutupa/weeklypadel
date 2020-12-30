import Player from './Player';
import { Teams } from './interfaces';

class Match {
  private local: [Player, Player];
  private visitor: [Player, Player];
  private result: [number | null, number | null];

  constructor(teams: Teams) {
    this.local = teams.local;
    this.visitor = teams.visitor;
    this.result = [null, null];
  }

  setGames(gamesTeamOne: number, gamesTeamTwo: number): void {
    this.result = [gamesTeamOne, gamesTeamTwo];
  }

  getResult(): [number | null, number | null] {
    return this.result;
  }

  getTeams(): Teams {
    return {
      local: this.local,
      visitor: this.visitor,
    };
  }

  getPlayers(): Player[] {
    return [...this.local, ...this.visitor];
  }
}

export default Match;
