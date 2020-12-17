interface Atom {
  key: string;
}

export interface TournamentTypeAtom extends Atom {
  default: string;
}

export interface TournamentModeAtom extends Atom {
  default: string;
}

export interface TournamentNameAtom extends Atom {
  default: string;
}

export interface PlayersAtom extends Atom {
  default: string[];
}
