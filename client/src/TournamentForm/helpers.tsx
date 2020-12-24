export const tournamentNameMinLength = 3;
export const tournamentMinNumberPlayers = 4;

export const freeForAllValue = 'freeForAll';
export const freeForAllLabel = 'Free-For-All!';
export const classicValue = 'classic';
export const classicLabel = 'Classic';
export const kingOfTheHillValue = 'kingOfTheHill';
export const kingOfTheHillLabel = 'King of the hill';

type Tournament = string;

export const fixedTeamsGame = function (
  selectedTournament: Tournament
): boolean {
  if (
    selectedTournament === classicValue ||
    selectedTournament === kingOfTheHillValue
  )
    return true;
  return false;
};

export const tournamentTypes = [
  { label: 'Round Robin', value: 'roundrobin' },
  { label: 'Brackets Tournament', value: 'brackets' },
];

// aweful useage of typescript.
// But for some reason when trying to use
// 'roundrobin' and 'brackets' as interface
// key, error propagated - invalid prop type -
// to other components

interface TournamentModes {
  [key: string]: { value: string; label: string }[];
}

export const tournamentModes: TournamentModes = {
  roundrobin: [
    {
      value: classicValue,
      label: classicLabel,
    },
    { value: freeForAllValue, label: freeForAllLabel },
  ],
  brackets: [
    {
      value: kingOfTheHillValue,
      label: kingOfTheHillLabel,
    },
  ],
};

interface TitleMapper {
  [key: string]: string;
}

interface NeonMapper {
  [key: string]: 'blue' | 'yellow';
}

export const titles: TitleMapper = {
  roundrobin: 'Round Robin',
  brackets: 'Brackets Tournament',
};

export const neonColors: NeonMapper = {
  roundrobin: 'yellow',
  brackets: 'blue',
};
