import { ROUND_ROBIN, BRACKETS } from 'utils/constants';

import {
  ROUND_ROBIN_CLASSIC,
  ROUND_ROBIN_FREE_FOR_ALL,
  BRACKETS_KING_OF_THE_HILL,
} from 'utils/constants';

export const freeForAllValue = ROUND_ROBIN_FREE_FOR_ALL;
export const freeForAllLabel = 'Free-For-All!';
export const classicValue = ROUND_ROBIN_CLASSIC;
export const classicLabel = 'Classic';
export const kingOfTheHillValue = BRACKETS_KING_OF_THE_HILL;
export const kingOfTheHillLabel = 'King of the hill';

export const tournamentTypes = [
  { label: 'Round Robin', value: ROUND_ROBIN },
  { label: 'Brackets Tournament', value: BRACKETS },
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
