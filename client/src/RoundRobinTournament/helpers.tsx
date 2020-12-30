import { ROUND_ROBIN_CLASSIC, ROUND_ROBIN_FREE_FOR_ALL } from 'utils/constants';

export function isIncorrectModeType(mode: string): boolean {
  if (mode !== ROUND_ROBIN_CLASSIC && mode !== ROUND_ROBIN_FREE_FOR_ALL)
    return true;
  return false;
}

export function playersStringToPlayersList(players: string): string[] {
  return players.split(',');
}
