import {
  RoundRobinBuilder,
  RotatingPlayersTournament,
  FixedTeamsTournament,
} from './helpers';
import Match from './Match';
import { Tournament, Players, Team } from './interfaces';
export default class RoundRobin {
  static rotatingPlayers(name: string) {
    return new RotatingPlayersRoundRobin(name, new Map());
  }

  static fixedTeams(name: string) {
    return new FixedTeamsRoundRobin(name, [], new Map());
  }
}

export class RotatingRR implements Tournament {
  public addPlayers: (players: string[]) => void;
  public getPlayersNames: () => string[];
  public schedule: () => Match[][];

  constructor(public name: string, private players: Players) {
    this.players = players;
    const playersHandler = new RotatingPlayersTournament(this.players);
    this.addPlayers = playersHandler.addPlayers;
    this.getPlayersNames = playersHandler.getPlayersNames;
    this.schedule = RoundRobinBuilder.rotatingTeams.bind(null, this.players);
  }
}

class RotatingPlayersRoundRobin extends RotatingPlayersTournament {
  constructor(public name: string, players: Players) {
    super(players);
    this.name = name;
  }

  schedule(): Match[][] {
    return RoundRobinBuilder.rotatingTeams(this.players);
  }
}

class FixedTeamsRoundRobin extends FixedTeamsTournament {
  constructor(public name: string, teams: Team[], players: Players) {
    super(teams, players);
  }

  schedule(): Match[][] {
    return RoundRobinBuilder.fixedTeams(this.teams);
  }
}
