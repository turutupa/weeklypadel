import Player from './Player';
import Match, { Teams } from './Match';
import Leaderboard from './Leaderboard';

type Players = Map<string, Player>;

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
   * Must exist a minimum of 8 players
   */
  createRoundRobinLeague(): void {
    const listOfPlayers: string[] = [];

    for (let [player, _] of this.players) {
      listOfPlayers.push(player);
    }

    if (listOfPlayers.length % 2 !== 0) listOfPlayers.push('BYE');

    const pairsOfPlayers: Set<[Player, Player]> = new Set();

    for (let i = 0; i < listOfPlayers.length - 1; i++) {
      for (let j = i + 1; j < listOfPlayers.length; j++) {
        const firstPlayer = this.players.get(listOfPlayers[i]);
        const secondPlayer = this.players.get(listOfPlayers[j]);

        if (firstPlayer && secondPlayer) {
          pairsOfPlayers.add([firstPlayer, secondPlayer]);
        }
      }
    }

    // Create matches of 4 players
    // Verifies local player is not in visitor team
    const matches: Set<Match> = new Set();

    for (let locals of pairsOfPlayers) {
      let localsMatched: boolean = false;
      for (let visitors of pairsOfPlayers) {
        if (localsMatched) continue;
        const firstLocal = locals[0];
        const secondLocal = locals[1];
        const firstVisitor = visitors[0];
        const secondVisitor = visitors[1];

        if (
          firstLocal !== firstVisitor &&
          firstLocal !== secondVisitor &&
          secondLocal !== firstVisitor &&
          secondLocal !== secondVisitor
        ) {
          matches.add(
            new Match({
              local: [firstLocal, secondLocal],
              visitor: [firstVisitor, secondVisitor],
            })
          );
          pairsOfPlayers.delete(locals);
          pairsOfPlayers.delete(visitors);
          localsMatched = true;
        }
      }
    }

    // console.log('Missing pairs', pairsOfPlayers);

    const rounds: number = this.players.size - 1;
    const schedule: Match[][] = [
      ...Array(rounds)
        .fill(1)
        .map((_) => []),
    ];

    // Adds the calculated matches to each round,
    // by 1. verifying the players only play once per round
    // AND 2. deletes the match from the matches array
    // to ensure the match is not duplicated
    for (let round of schedule) {
      let roundPlayers: Set<string> = new Set();
      for (let possibleMatch of matches) {
        for (let match of round) {
          const matchPlayers = match.getPlayers();

          for (let player of matchPlayers) {
            roundPlayers.add(player.name);
          }
        }
        const possiblePlayers = possibleMatch.getTeams();
        const [firstLocal, secondLocal] = [...possiblePlayers.local];
        const [firstVisitor, secondVisitor] = [...possiblePlayers.visitor];
        if (
          !roundPlayers.has(firstLocal.name) &&
          !roundPlayers.has(secondLocal.name) &&
          !roundPlayers.has(firstVisitor.name) &&
          !roundPlayers.has(secondVisitor.name)
        ) {
          round.push(possibleMatch);
          matches.delete(possibleMatch);
        }
      }
    }

    console.log('Missing matches:', matches);
    this.schedule = [...schedule];
  }
}

export default Tournament;
