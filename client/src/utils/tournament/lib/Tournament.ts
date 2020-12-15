import Player from './Player';
import Match from './Match';
import RoundRobin from './RoundRobin';
// import Leaderboard from './Leaderboard';

export type Players = Map<string, Player>;

class Tournament {
  static named(name: string) {
    return new Tournament(name, new Map(), new RoundRobin());
  }

  constructor(
    public name: string,
    private players: Players,
    private roundRobin: RoundRobin
  ) {}

  // Get All Players
  getPlayers(): Players {
    return this.players;
  }

  // Get array of players names
  getPlayersNames(): string[] {
    let playersNames: string[] = [];
    for (let [key, _] of this.players) {
      playersNames.push(key);
    }

    return playersNames;
  }

  /**
   * Public method to add players in batch
   * @param players: string[]
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

  roundRobinRandomAssignedPair() {}

  roundRobinFixedPairs(pairs: [string, string][]) {
    return this.roundRobin.roundRobinFixedPairs(pairs);
  }

  roundRobinAlternatingPairs(): Match[][] {
    return this.roundRobin.roundRobinAlternatingPairs(this.players);
  }
}

export default Tournament;
