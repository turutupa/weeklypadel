import { primary, secondary, sunset, dawn, night } from 'utils/colors';

export enum fontFamily {
  primary = 'RoadRage',
  secondary = 'Neon',
}

export enum fontWeight {
  thin = 300,
  normal = 400,
  medium = 500,
  bold = 700,
  bolder = 900,
}

export class fontColor {
  static primary = primary;
  static secondary = secondary;
  static sunset = sunset;
  static dawn = dawn;
  static night = night;
}
