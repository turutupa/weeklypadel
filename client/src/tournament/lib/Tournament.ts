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

  // Get All Players
  getPlayers(): Players {
    return this.players;
  }

  // Get all players names in an array
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

  /**
   * Create Round Robin League with this.players.
   * RoundRobin library creates all combinations of pair per round
   *
   * Iterate over each round and convert those pairs of string
   * to pairs of type Player
   *
   * Create Matches with those pairs of Players
   */
  createRoundRobinLeague(): Match[][] {
    const rounds = robin(this.getPlayersNames().length, this.getPlayersNames());

    let missingPairsToPlay: [string, string][] = [];

    const schedule = rounds.map((r: [string, string][]): Match[] => {
      let roundWithMatches: Match[] = [];
      let round = [...r];

      while (round.length) {
        const local = round.shift();
        const visitor = round.shift();

        if (local && visitor) {
          const teams: Teams = {
            local: this._getPlayersFromNames(this.players, local),
            visitor: this._getPlayersFromNames(this.players, visitor),
          };
          const match = new Match(teams);
          roundWithMatches.push(match);
        }

        if (local && !visitor) missingPairsToPlay.push(local);
        if (!local && visitor) missingPairsToPlay.push(visitor);
      }

      return roundWithMatches;
    });

    // All rounds have been defined and filled.
    // Now time to assign players with missing games to play
    // This could be deleted because it works like shite
    const additionalRounds: any = {};
    const playersMap: any = {};
    let usedPairs: Set<number> = new Set();

    for (let i = 0; i < 50; i++) playersMap[String(i)] = new Set();

    for (let i = 0; i < missingPairsToPlay.length - 1; i++) {
      for (let j = i + 1; j < missingPairsToPlay.length; j++) {
        if (usedPairs.has(i) || usedPairs.has(j)) continue;

        const local = missingPairsToPlay[i];
        const visitor = missingPairsToPlay[j];

        if (local && visitor) {
          const [firstLocal, secondLocal] = local;
          const [firstVisitor, secondVisitor] = visitor;

          if (
            firstLocal !== firstVisitor &&
            firstLocal !== secondVisitor &&
            secondLocal !== firstVisitor &&
            secondLocal !== secondVisitor
          ) {
            const match = new Match({
              local: this._getPlayersFromNames(this.players, local),
              visitor: this._getPlayersFromNames(this.players, visitor),
            });
            usedPairs.add(i);
            usedPairs.add(j);

            let matchAdded: boolean = false;
            for (let r in playersMap) {
              if (
                !matchAdded &&
                !playersMap[r].has(firstLocal) &&
                !playersMap[r].has(secondLocal) &&
                !playersMap[r].has(firstVisitor) &&
                !playersMap[r].has(secondVisitor)
              ) {
                additionalRounds[r] = (additionalRounds[r] && [
                  ...additionalRounds[r],
                  match,
                ]) || [match];
                playersMap[r].add(firstLocal);
                playersMap[r].add(secondLocal);
                playersMap[r].add(firstVisitor);
                playersMap[r].add(secondVisitor);
                matchAdded = true;
              }
            }
          }
        }
      }
    }

    for (let r in additionalRounds) {
      if (additionalRounds[r].length) {
        schedule.push(additionalRounds[r]);
      }
    }

    return schedule;
  }

  _getPlayersFromNames(
    players: Players,
    team: [string, string]
  ): [Player, Player] {
    const firstPlayer = players.get(team[0]);
    const secondPlayer = players.get(team[1]);
    if (firstPlayer && secondPlayer) return [firstPlayer, secondPlayer];
    else throw new Error('Not enough players!');
  }
}

export default Tournament;
