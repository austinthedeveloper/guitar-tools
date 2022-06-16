import { sortBy } from 'lodash-es';

export const relativeMajor = {
  Ab: 'B',
  A: 'C',
  Bb: 'C#',
  B: 'D',
  C: 'Eb',
  Db: 'E',
  D: 'F',
  Eb: 'F#',
  E: 'G',
  F: 'G#',
  Gb: 'A',
  G: 'Bb',
};

export const relativeMajorValues = sortBy(
  Object.values(relativeMajor),
  (value) => value
);
export const relativeMajorArray = Object.entries(relativeMajor);
