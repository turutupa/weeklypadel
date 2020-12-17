export const freeForAllValue = 'freeForAll';
export const freeForAllLabel = 'Free-For-All!';
export const classicValue = 'classic';
export const classicLabel = 'Classic';
export const kingOfTheHillValue = 'kingOfTheHill';
export const kingOfTheHillLabel = 'King of the hill';

export const tournamentTypes = [
  { label: 'Round Robin', value: 'roundrobin' },
  { label: 'Brackets Tournament', value: 'brackets' },
];

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
