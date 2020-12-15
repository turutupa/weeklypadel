export const tournamentOptions = [
  { label: 'Round Robin', value: 'roundrobin' },
  { label: 'Brackets Tournament', value: 'brackets' },
];

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
