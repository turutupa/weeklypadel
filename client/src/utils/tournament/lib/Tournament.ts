import { Tournament, TournamentModes } from './interfaces';
import RoundRobin from './RoundRobin';
import Brackets from './Brackets';

export default class TournamentBuilder {
  static roundRobin(name: string, type: TournamentModes): Tournament {
    if (type === TournamentModes.fixedTeams) {
      return RoundRobin.fixedTeams(name);
    }

    return RoundRobin.rotatingPlayers(name);
  }

  static brackets(): void {
    console.log('You trying to create a Brackets Tournament? 😅');
  }
}
