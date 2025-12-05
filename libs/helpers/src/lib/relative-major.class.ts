import { Key, Note } from '@tonaljs/tonal';
import { sortPitchClasses } from './note-order.util';

/**
 * Complete set of minor tonics supported in the UI.
 */
const MINOR_KEYS = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];

export const relativeMajor = buildRelativeMajorMap();
export const relativeMajorValues = sortPitchClasses(Object.values(relativeMajor));
export const relativeMajorArray = Object.entries(relativeMajor);

/**
 * Uses Tonal to derive the relative major for each supported minor key.
 */
function buildRelativeMajorMap(): Record<string, string> {
  return MINOR_KEYS.reduce((acc, minorKey) => {
    const relative = Key.minorKey(minorKey).relativeMajor;
    const formatted = formatPitch(relative);

    return { ...acc, [minorKey]: formatted };
  }, {} as Record<string, string>);
}

/**
 * Normalises Tonal output so our UI keeps the expected enharmonic labels.
 */
function formatPitch(note: string | undefined): string {
  if (!note) {
    return '';
  }

  const sanitized = note.replace(/♯/g, '#').replace(/♭/g, 'b');
  const enharmonic = Note.enharmonic(sanitized);
  const pitchClass = Note.pitchClass(enharmonic ? enharmonic : sanitized);

  return pitchClass || sanitized;
}
