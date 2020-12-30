import { atom } from 'recoil';
import { classicValue } from './helpers';
import {
  TournamentTypeAtom,
  TournamentModeAtom,
  TournamentNameAtom,
  PlayersAtom,
  TeamsAtom,
} from './interfacesAtom';

const tournamentTypeAtom: TournamentTypeAtom = {
  key: 'tournamentType',
  default: 'roundrobin',
};

const tournamentModeAtom: TournamentModeAtom = {
  key: 'tournamentMode',
  default: classicValue,
};

const tournamentNameAtom: TournamentNameAtom = {
  key: 'tournamentName',
  default: '',
};

const playersAtom: PlayersAtom = {
  key: 'players',
  default: [],
};

const teamsAtom: TeamsAtom = {
  key: 'teams',
  default: [],
};

export const tournamentType = atom(tournamentTypeAtom);
export const tournamentMode = atom(tournamentModeAtom);
export const tournamentName = atom(tournamentNameAtom);
export const players = atom(playersAtom);
export const teams = atom(teamsAtom);
