import Player from './Player';
import Match, { Teams } from './Match';

type Players = Map<string, Player>;

class Tournament {
  static named(name: string) {
    return new Tournament(name);
  }

  private players: Players;
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.players = new Map();
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
  createRoundRobinLeague() {
    const pairsOfPlayers: [Player, Player][] = [];

    const listOfPlayers: string[] = [];

    for (let [player, _] of this.players) {
      listOfPlayers.push(player);
    }

    for (let i = 0; i < listOfPlayers.length - 1; i++) {
      for (let j = i + 1; j < listOfPlayers.length; j++) {
        const firstPlayer = this.players.get(listOfPlayers[i]);
        const secondPlayer = this.players.get(listOfPlayers[j]);

        if (firstPlayer && secondPlayer) {
          pairsOfPlayers.push([firstPlayer, secondPlayer]);
        }
      }
    }

    // console.log(pairsOfPlayers);

    interface PlayersGraph {
      [playersName: string]: Set<string>;
    }

    // Create a graph and a function to update graph
    // to trace wether players have already played together
    // so they are not again matched to play together
    const playersGraph: PlayersGraph = {};
    const matches: Set<Match> = new Set();

    function hasAlreadyPlayedTogether(player: Player, newPartner: Player) {
      const graphPlayer = playersGraph[player.name];
      if (graphPlayer) {
        if (graphPlayer.has(newPartner.name)) return true;
        else {
          playersGraph[player.name].add(newPartner.name);
          return false;
        }
      } else if (!graphPlayer) {
        playersGraph[player.name] = new Set([newPartner.name]);
        return false;
      }
    }

    // Create matches of 4 players
    for (let i = 0; i < pairsOfPlayers.length - 1; i++) {
      const firstLocal = pairsOfPlayers[i][0];
      const secondLocal = pairsOfPlayers[i][1];
      let haveMatchAssigned: boolean = false;

      // if (
      //   hasAlreadyPlayedTogether(firstLocal, secondLocal) ||
      //   hasAlreadyPlayedTogether(secondLocal, firstLocal)
      // ) {
      //   continue;
      // }

      for (let j = i + 1; j < pairsOfPlayers.length; j++) {
        if (haveMatchAssigned) continue;
        const firstVisitor = pairsOfPlayers[j][0];
        const secondVisitor = pairsOfPlayers[j][1];

        // if (
        //   hasAlreadyPlayedTogether(firstVisitor, secondVisitor) ||
        //   hasAlreadyPlayedTogether(secondVisitor, firstVisitor)
        // ) {
        //   continue;
        // }

        // check that local players are not in visitors
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
          haveMatchAssigned = true;
        }
      }
    }

    // console.log(playersGraph);
    // for (let match of matches) {
    //   console.log(JSON.stringify(match, null, 2));
    // }

    // Creates number of rounds taking into account
    // the number of players
    const rounds: number = this.players.size - 1;
    const schedule: Match[][] = [
      ...Array(rounds)
        .fill(1)
        .map((_) => []),
    ];

    // Adds the calculates matches to each round,
    // by verifying the players only play once per round
    // AND
    // deletes the match from the matches array
    // to be sure the match is not duplicated
    for (let round of schedule) {
      let roundPlayers: Set<string> = new Set();
      for (let possibleMatch of matches) {
        for (let match of round) {
          const matchPlayers = match.getPlayers();

          for (let player of matchPlayers) {
            roundPlayers.add(player.name);
          }

          // console.log('Round players: ', roundPlayers);
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

    // console.log('Schedule', schedule);
    // console.log('Schedule:', JSON.stringify(schedule, null, 2));
    // console.log(matches);
    return schedule;
  }
}

export default Tournament;
