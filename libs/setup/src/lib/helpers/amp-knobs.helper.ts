import { KnobType } from '@guitar/interfaces';

export const AMP_KNOBS: KnobType[] = [
  { name: 'Volume' },
  { name: 'Bass' },
  { name: 'Middle' },
  { name: 'Treble' },
  { name: 'Master' },
  { name: 'Presence' },
  { name: 'Reverb' },
  { name: 'Gain' },
  { name: 'Contour' },
  { name: 'Resonance' },
  { name: 'Bright' },
  { name: 'Depth' },
  { name: 'Limiter' },
  { name: 'Overdrive' },
  { name: 'Compression' },
  { name: 'EQ Shift' },
];
export const AMP_KNOB_NAMES = AMP_KNOBS.map((k) => k.name);
