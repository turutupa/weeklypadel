import robin from 'roundrobin';
import Player from './Player';
import Match, { Teams } from './Match';
// import Leaderboard from './Leaderboard';

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

  getPlayersNames(): string[] {
    let playersNames: string[] = [];
    for (let [key, _] of this.players) {
      playersNames.push(key);
    }

    return playersNames;
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
   * Must exist a minimum of 8 players
   */
  createRoundRobinLeague(): Match[][] {
    const rounds = robin(this.getPlayersNames().length, this.getPlayersNames());

    const schedule = rounds.map((round: [string, string][]): Match[] => {
      let roundWithMatches: Match[] = [];
      let r = [...round];

      function getPlayers(
        players: Players,
        team: [string, string]
      ): [Player, Player] {
        const firstPlayer = players.get(team[0]);
        const secondPlayer = players.get(team[1]);
        if (firstPlayer && secondPlayer) return [firstPlayer, secondPlayer];
        else throw new Error('Not enough players!');
      }

      while (r.length) {
        const local = r.shift();
        const visitor = r.shift();

        let teams: Teams;

        if (local && visitor) {
          teams = {
            local: getPlayers(this.players, local),
            visitor: getPlayers(this.players, visitor),
          };
          const match = new Match(teams);
          roundWithMatches.push(match);
        }
      }

      return roundWithMatches;
    });

    return schedule;
  }
}

export default Tournament;
