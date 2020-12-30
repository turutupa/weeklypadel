import { Results } from './interfaces';
class Player {
  private wins: number;
  private loses: number;
  private points: number;

  constructor(public name: string) {
    this.name = name;
    this.wins = 0;
    this.loses = 0;
    this.points = 0;
  }

  static named(name: string): Player {
    return new Player(name);
  }

  addScore() {}

  getResults(): Results {
    return {
      wins: this.wins,
      loses: this.loses,
      points: this.points,
    };
  }
}

export default Player;
