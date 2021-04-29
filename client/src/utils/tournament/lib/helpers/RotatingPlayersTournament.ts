import Player from '../Player';

import { Players } from '../interfaces';

export default class RotatingPlayersBuilder {
  constructor(readonly players: Players) {}

  // Get All Players
  // getPlayers(): Players {
  //   return this.players;
  // }

  // Get array of players names
  getPlayersNames(): string[] {
    let playersNames: string[] = [];
    for (let [key, _] of this.players) {
      playersNames.push(key);
    }

    return playersNames;
  }

  /**
   * Public method to add players in batch
   * @param players: string[]
   */
  addPlayers(players: string[]): void {
    players.forEach((player) => this.addPlayer(player));
  }

  /**
   * Public method to add one player to the tournament
   * @param {Player} player
   * @return {void}
   */
  addPlayer(player: string): void {
    if (this.players.has(player)) {
      throw new Error(`Player named ${player} already exists`);
    }

    this.players.set(player, Player.named(player));
    return;
  }
}
