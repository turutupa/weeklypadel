import { atom } from 'recoil';
import { Tournament } from 'utils/tournament';

interface Atom {
  key: string;
}

interface TournamentAtom extends Atom {
  default: Tournament | null;
}

const tournamentAtom: TournamentAtom = {
  key: 'tournament',
  default: null,
};

export const tournament = atom(tournamentAtom);
