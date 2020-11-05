import Player from './Player';
import Match from './Match';
import Leaderboard from './Leaderboard';
import {
  generatePairsOfPlayers,
  generateMatches,
  generateSchedule,
} from './utils';

export type Players = Map<string, Player>;

class Tournament {
  static named(name: string) {
    return new Tournament(name);
  }

  private players: Players;
  public schedule: Match[][];

  constructor(public name: string) {
    this.name = name;
    this.players = new Map();
    this.schedule = [];
  }

  /**
   * Public Method to Get all participating players
   */
  getPlayers(): Players {
    return this.players;
  }

  /**
   * Public method to add players in batch
   * @param players
   */
  addPlayers(players: string[]): void {
    players.forEach((player) => this.addPlayer(player));
  }

  /**
   * Public method to add one player to the tournament
   * @param {Player} player
   * @return {void}
   */
  addPlayer(player: string): void {
    if (this.players.has(player)) {
      new Error(`Player named ${player} already exists`);
    }

    this.players.set(player, Player.named(player));
    return;
  }

  /**
   * Create Round Robin League with this.players.
   * Must exist a minimum of 4 players
   */
  createRoundRobinWithUniquePairs(): void {
    if (this.players.size % 4 !== 0) return;
    const pairsOfPlayers = generatePairsOfPlayers(this.players);
    const matches = generateMatches(pairsOfPlayers);
    const schedule = generateSchedule(matches);
    this.schedule = [...schedule];
  }

  createRoundRobinWithPairs(): void {}

  createBracketsTournament(): void {}
}

export default Tournament;
