import { Note } from '@tonaljs/tonal';

/**
 * Diatonic-friendly interval set for building a chromatic octave with Tonal.
 */
const CHROMATIC_INTERVALS = [
  '1P',
  '2m',
  '2M',
  '3m',
  '3M',
  '4P',
  '4A',
  '5P',
  '6m',
  '6M',
  '7m',
  '7M',
];

/**
 * Maps Tonal pitch classes to the combined sharp/flat labels already used by the UI.
 */
const DISPLAY_MAP: Record<string, string> = {
  A: 'A',
  'A#': 'A# / B♭',
  Bb: 'A# / B♭',
  B: 'B',
  C: 'C',
  'C#': 'C# / D♭',
  Db: 'C# / D♭',
  D: 'D',
  'D#': 'D# / E♭',
  Eb: 'D# / E♭',
  E: 'E',
  F: 'F',
  'F#': 'F# / G♭',
  Gb: 'F# / G♭',
  G: 'G',
  'G#': 'G# / A♭',
  Ab: 'G# / A♭',
};

const DEFAULT_SCALE = buildChromaticScale('A');

export const SCALE = DEFAULT_SCALE;

/**
 * Returns a chromatic scale rotated to start on the requested key.
 * Falls back to `DEFAULT_SCALE` when Tonal cannot resolve the key.
 */
export function scaleStartWith(key: string): string[] {
  const sanitized = sanitizeKey(key);
  const note = Note.get(sanitized);

  if (note.empty) {
    return DEFAULT_SCALE;
  }

  return buildChromaticScale(note.pc);
}

/**
 * Builds a chromatic octave from the supplied tonic using Tonal interval math.
 */
function buildChromaticScale(key: string): string[] {
  return CHROMATIC_INTERVALS.map((interval) => {
    const transposed = Note.transpose(key, interval);
    const enharmonic = Note.enharmonic(transposed);
    const pitchClass = Note.pitchClass(enharmonic ? enharmonic : transposed);

    return mapToDisplay(pitchClass);
  });
}

/**
 * Normalises Tonal's pitch class back to the existing display convention.
 */
function mapToDisplay(note: string): string {
  const normalized = note.replace(/♯/g, '#').replace(/♭/g, 'b');

  return DISPLAY_MAP[normalized] ?? normalized;
}

/**
 * Accepts combined sharp/flat labels (e.g. `A# / B♭`) and strips adornments for Tonal.
 */
function sanitizeKey(key: string): string {
  return key
    .split(' / ')[0]
    .replace(/♯/g, '#')
    .replace(/♭/g, 'b')
    .trim();
}
