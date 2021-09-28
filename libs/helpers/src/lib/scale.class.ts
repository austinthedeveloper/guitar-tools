export const SCALE = ['A', 'A #', 'B', 'C', 'C #', 'D', 'D #', 'E', 'F', 'F #', 'G', 'G #'];

export function scaleStartWith(key: string): string[] {
  const index: number = SCALE.indexOf(key);
  const split: string[] = SCALE.slice(index);
  const beginning: string[] = SCALE.slice(0, index);
  return [...split, ...beginning];
}
