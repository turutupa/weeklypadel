import { Players } from './Tournament';
import Match from './Match';
import Player from './Player';

export function generatePairsOfPlayers(players: Players) {
  const listOfPlayers: string[] = [];

  for (let [player, _] of players) {
    listOfPlayers.push(player);
  }

  // if (listOfPlayers.length % 2 !== 0) {
  //   listOfPlayers.push('BYE');
  //   players.set('BYE', Player.named('BYE'));
  // }

  // console.log('LIST OF PLAYERS', listOfPlayers);

  const pairsOfPlayers: Set<[Player, Player]> = new Set();

  for (let i = 0; i < listOfPlayers.length - 1; i++) {
    for (let j = i + 1; j < listOfPlayers.length; j++) {
      const firstPlayer = players.get(listOfPlayers[i]);
      const secondPlayer = players.get(listOfPlayers[j]);

      if (firstPlayer && secondPlayer && firstPlayer !== secondPlayer) {
        pairsOfPlayers.add([firstPlayer, secondPlayer]);
      }
    }
  }

  return pairsOfPlayers;
}

// Create matches of 4 players
// Verifies local player is not in visitor team
export function generateMatches(
  pairsOfPlayers: Set<[Player, Player]>
): Set<Match> {
  let result: Set<Match> = new Set();
  let missingPairs: [Player, Player][] = [];
  let foundOptimalSolution: boolean = false;

  function backtrack(pairs: Set<[Player, Player]>, matches: Set<Match>) {
    if (foundOptimalSolution) return;
    if (matches.size >= result.size) {
      result = new Set([...matches]);
      missingPairs = [...pairs];
      if (pairs.size === 0) {
        foundOptimalSolution = true;
      }
    }

    for (let local of pairs) {
      for (let visitor of pairs) {
        if (local === visitor) continue;

        const [firstLocal, secondLocal] = local;
        const [firstVisitor, secondVisitor] = visitor;

        if (
          firstLocal !== firstVisitor &&
          firstLocal !== secondVisitor &&
          secondLocal !== firstVisitor &&
          secondLocal !== secondVisitor
        ) {
          const copyOfMatches = new Set([...matches]);
          const copyOfPairs = new Set([...pairs]);

          const newMatch = new Match({
            local,
            visitor,
          });
          copyOfMatches.add(newMatch);
          copyOfPairs.delete(local);
          copyOfPairs.delete(visitor);

          // memo.set(allPlayersNames, matches);

          backtrack(copyOfPairs, copyOfMatches);
        }
      }
    }
  }

  backtrack(pairsOfPlayers, new Set());
  console.log('Missing pairs', missingPairs);
  return result;
}

export function generateSchedule(matches: Set<Match>): Match[][] {
  type Schedule = Match[][];
  let result: Schedule = [...new Array(99).fill(1)];

  function backtrack(
    listOfMatches: Set<Match>,
    schedule: Schedule = [],
    round: Match[] = [],
    roundPlayers: Set<string> = new Set()
  ) {
    if (schedule.length > result.length) return;
    if (!listOfMatches.size) {
      if (result.length > schedule.length) {
        result = [...schedule, round];
      }
    }

    for (let possibleMatch of listOfMatches) {
      const possiblePlayers = possibleMatch.getTeams();
      const [firstLocal, secondLocal] = [...possiblePlayers.local];
      const [firstVisitor, secondVisitor] = [...possiblePlayers.visitor];

      const copyOfRound = [...round];
      const copyOfSchedule = [...schedule];
      const copyOflistOfMatches = new Set([...listOfMatches]);
      const copyOfRoundPlayers = new Set([...roundPlayers]);

      if (
        !copyOfRoundPlayers.has(firstLocal.name) &&
        !copyOfRoundPlayers.has(secondLocal.name) &&
        !copyOfRoundPlayers.has(firstVisitor.name) &&
        !copyOfRoundPlayers.has(secondVisitor.name)
      ) {
        // to prevent duplicated players
        copyOfRoundPlayers.add(firstLocal.name);
        copyOfRoundPlayers.add(secondLocal.name);
        copyOfRoundPlayers.add(firstVisitor.name);
        copyOfRoundPlayers.add(secondVisitor.name);

        copyOflistOfMatches.delete(possibleMatch);
        copyOfRound.push(possibleMatch);

        backtrack(
          copyOflistOfMatches,
          copyOfSchedule,
          copyOfRound,
          copyOfRoundPlayers
        );
      } else {
        backtrack(copyOflistOfMatches, [...copyOfSchedule, round]);
      }
    }
  }

  backtrack(matches);

  console.log('RESULT', result);

  return [...result];
}
