import { Players, Team } from '../interfaces';

export default class FixedTeamsTournament {
  constructor(readonly teams: Team[], private players: Players) {}

  addPlayers(team: [string, string][]) {}

  addPlayer(teams: [string, string][]) {}
}
