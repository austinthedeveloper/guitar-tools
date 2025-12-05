import { sortBy } from 'lodash-es';

const LETTER_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const ACCIDENTAL_WEIGHT: Record<string, number> = { b: -1, '#': 1, '': 0 };

/**
 * Sorts pitch classes so flats come before naturals and naturals before sharps within a letter.
 * Example: Ab, A, A#.
 */
export function sortPitchClasses(notes: string[]): string[] {
  return sortBy(notes, noteSortValue);
}

function noteSortValue(note: string): [number, number] {
  const match = note.match(/^([A-G])([b#]?)/);
  const letter = match?.[1] ?? note;
  const accidental = match?.[2] ?? '';
  const letterIndex = LETTER_ORDER.indexOf(letter);
  const accidentalWeight = ACCIDENTAL_WEIGHT[accidental] ?? 0;

  return [letterIndex === -1 ? Number.MAX_SAFE_INTEGER : letterIndex, accidentalWeight];
}
