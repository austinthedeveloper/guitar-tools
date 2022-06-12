import { sortBy } from 'lodash-es';

export const relativeMinor = {
  Ab: 'F',
  A: 'F#',
  Bb: 'G',
  B: 'G#',
  C: 'A',
  Db: 'Bb',
  D: 'B',
  Eb: 'C',
  E: 'C#',
  F: 'D',
  Gb: 'Eb',
  G: 'E',
};

export const relativeMinorValues = sortBy(
  Object.values(relativeMinor),
  (value) => value
);
export const relativeMinorArray = Object.entries(relativeMinor);
