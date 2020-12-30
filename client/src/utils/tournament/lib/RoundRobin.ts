import {
  RoundRobinBuilder,
  RotatingPlayersTournament,
  FixedTeamsTournament,
} from './helpers';
import Match from './Match';
import { Players, Team } from './interfaces';
export default class RoundRobin {
  static rotatingPlayers(name: string) {
    return new RotatingPlayersRoundRobin(name, new Map());
  }

  static fixedTeams(name: string) {
    return new FixedTeamsRoundRobin(name, [], new Map());
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
