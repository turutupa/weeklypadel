import { Players } from './Tournament';
import Match from './Match';
import Player from './Player';

export function generatePairsOfPlayers(players: Players) {
  const listOfPlayers: string[] = [];

  for (let [player, _] of players) {
    listOfPlayers.push(player);
  }

  if (listOfPlayers.length % 2 !== 0) listOfPlayers.push('BYE');

  const pairsOfPlayers: Set<[Player, Player]> = new Set();

  for (let i = 0; i < listOfPlayers.length - 1; i++) {
    for (let j = i + 1; j < listOfPlayers.length; j++) {
      const firstPlayer = players.get(listOfPlayers[i]);
      const secondPlayer = players.get(listOfPlayers[j]);

      if (firstPlayer && secondPlayer) {
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
  console.log('Missing pairs', pairsOfPlayers);
  return matches;
}

export function generateSchedule(matches: Set<Match>): Match[][] {
  const schedule: Match[][] = [];

  // Adds the calculated matches to each round,
  // by 1. verifying the players only play once per round
  // AND 2. deletes the match from the matches array
  // to ensure the match is not duplicated
  while (matches.size) {
    let round = [];
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
    schedule.push(round);
  }

  console.log('Missing matches:', matches);
  return [...schedule];
}
