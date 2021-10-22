export interface UserOptionsInterface {
  tuning: string;
  frets: number;
  strings: string;
}

export class UserOptions implements UserOptionsInterface {
  tuning = 'standard';
  frets = 15;
  strings = '6';
  constructor() {}
}
