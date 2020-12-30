import Match from '../Match';
import Player from '../Player';
import robin from 'roundrobin';

import { Team, Teams, Players } from '../interfaces';

export default class RoundRobinBuilder {
  static _getPlayersFromNames(
    players: Players,
    team: [string, string]
  ): [Player, Player] {
    const firstPlayer = players.get(team[0]);
    const secondPlayer = players.get(team[1]);
    if (firstPlayer && secondPlayer) return [firstPlayer, secondPlayer];
    else throw new Error('Not enough players!');
  }

  /**
   * Creates a round robin tournament in which you play
   * with a fixed partner and you play at least once
   * against each other pair
   * @param players: Players
   */
  static fixedTeams(pairs: Team[]): Match[][] {
    // const pairsOfPlayers = pairs.map((pair) =>
    //   pair.map((player) => Player.named(player))
    // );

    // i left it here... god knows what I was doing xd
    // const rounds = robin(
    //   pairs.length,
    //   pairs.map((pair) => `${pair[0]} ${pair[1]}`)
    // );
    // console.log('fixed pairs rr', rounds);

    return [];
  }

  /**
   * RoundRobin library creates all combinations of pair per round
   *
   * Iterate over each round and convert those pairs of string
   * to pairs of type Player
   *
   * Create Matches with those pairs of Players
   * @param players: Players
   */
  static rotatingTeams(players: Players): Match[][] {
    const rounds = robin(players.size, [...players.keys()]);

    let missingPairsToPlay: [string, string][] = [];

    const schedule = rounds.map((r: [string, string][]): Match[] => {
      let roundWithMatches: Match[] = [];
      let round = [...r];

      while (round.length) {
        const local = round.shift();
        const visitor = round.shift();

        if (local && visitor) {
          const teams: Teams = {
            local: this._getPlayersFromNames(players, local),
            visitor: this._getPlayersFromNames(players, visitor),
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
              local: this._getPlayersFromNames(players, local),
              visitor: this._getPlayersFromNames(players, visitor),
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
}
