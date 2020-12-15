import { atom } from 'recoil';

interface TournamentType {
  key: string;
  default: string;
}

const tournamentTypeDefault: TournamentType = {
  key: 'tournamentType',
  default: 'roundrobin',
};

export const tournamentType = atom(tournamentTypeDefault);
