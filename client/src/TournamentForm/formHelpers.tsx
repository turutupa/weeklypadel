import { classicValue, kingOfTheHillValue } from './helpers';

export const tournamentNameMinLength = 3;
export const tournamentMinNumberPlayers = 4;
export const tournamentMinNumberTeams = 4;
export const tournamentNameLengthErrorMsg = `Name must have at least ${tournamentNameMinLength} characters`;
export const minNumberOfPlayersErrorMsg = `At least ${tournamentMinNumberPlayers} players are required`;
export const minNumberOfTeamsErrorMsg = `At least ${tournamentMinNumberTeams} teams are required`;

// function to avoid spaces in players names
export const playerNameWithoutSpaces = (player: (v: string) => void) => (
  val: string
) => player(val.trim());

// handle add new players
//  - avoids duplicated players
//  - checks player name is not empty space
export interface PlayerHandler {
  addPlayer: (player: string) => string[];
  removePlayer: (player: string) => string[];
}

function handleNewPlayerClosure(): PlayerHandler {
  const players: Set<string> = new Set();

  return {
    addPlayer: (player: string): string[] => {
      if (player === '') throw 'Players name must not be empty';
      if (players.has(player)) {
        throw `Player ${player} already exists`;
      }
      const updatedPlayersList: string[] = [...players, player];
      players.add(player);
      return updatedPlayersList;
    },
    removePlayer: (player: string): string[] => {
      players.delete(player.trim());
      return [...players];
    },
  };
}

export const handlePlayers = handleNewPlayerClosure();

interface TeamHandler {
  addTeam: (team: string[]) => string[][];
  removeTeam: (index: number) => string[][];
}

interface TeamError {
  msg: string;
  player: number;
}

// handle adding new teams
function handleNewTeamClosure(): TeamHandler {
  const players = new Set();
  let teams: string[][] = [];

  return {
    addTeam: (team: string[]): string[][] => {
      if (team[0].length === 0) throw `Player 1 must not be empty`;
      if (team[1].length === 0) throw `Player 2 must not be emtpy`;

      if (team[0] === team[1]) throw `Players must have different names`;

      team.forEach((player, index) => {
        if (players.has(player)) throw `Player ${player} already exists`;
      });

      // this one should never be triggered
      // added just in case
      if (team.length !== 2) throw `Team must have 2 players`;

      team.forEach((player) => players.add(player));
      teams = [...teams, team];

      return teams;
    },

    removeTeam: (index: number): string[][] => {
      const newTeamsList = [...teams];
      const removedTeam = newTeamsList.splice(index, 1);
      if (removedTeam.length === 1) {
        const p = removedTeam[0];
        const [p1, p2] = p;
        players.delete(p1);
        players.delete(p2);
      }
      teams = [...newTeamsList];

      return teams;
    },
  };
}

export const handleTeams = handleNewTeamClosure();

// check if tournament has fixed pair or
// has rotating pairs
type Tournament = string;

export const isFixedPairsGame = function (
  selectedTournament: Tournament
): boolean {
  if (
    selectedTournament === classicValue ||
    selectedTournament === kingOfTheHillValue
  )
    return true;
  return false;
};
