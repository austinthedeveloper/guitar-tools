import { sortBy } from 'lodash-es';
import { Key, Note } from '@tonaljs/tonal';

/**
 * Complete set of major tonics supported in the UI.
 */
const MAJOR_KEYS = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];

export const relativeMinor = buildRelativeMinorMap();
export const relativeMinorValues = sortBy(Object.values(relativeMinor), (value) => value);
export const relativeMinorArray = Object.entries(relativeMinor);

/**
 * Uses Tonal to derive the relative minor for each supported major key.
 */
function buildRelativeMinorMap(): Record<string, string> {
  return MAJOR_KEYS.reduce((acc, majorKey) => {
    const relative = Key.majorKey(majorKey).minorRelative;
    const formatted = formatPitch(relative);

    return { ...acc, [majorKey]: formatted };
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
