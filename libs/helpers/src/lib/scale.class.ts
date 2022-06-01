export const SCALE = [
  'A',
  'A# / B♭',
  'B',
  'C',
  'C# / D♭',
  'D',
  'D# / E♭',
  'E',
  'F',
  'F# / G♭',
  'G',
  'G# / A♭',
];

export function scaleStartWith(key: string): string[] {
  const index: number = SCALE.indexOf(key);
  const split: string[] = SCALE.slice(index);
  const beginning: string[] = SCALE.slice(0, index);
  return [...split, ...beginning];
}
