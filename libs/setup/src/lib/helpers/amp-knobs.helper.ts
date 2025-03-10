import { KnobType } from '@guitar/interfaces';

export const AMP_KNOBS: KnobType[] = [
  { name: 'Volume', type: 'knob' },
  { name: 'Bass', type: 'knob' },
  { name: 'Middle', type: 'knob' },
  { name: 'Treble', type: 'knob' },
  { name: 'Master', type: 'knob' },
  { name: 'Presence', type: 'knob' },
  { name: 'Reverb', type: 'knob' },
  { name: 'Gain', type: 'knob' },
  { name: 'Contour', type: 'knob' },
  { name: 'Resonance', type: 'knob' },
  { name: 'Bright', type: 'knob' },
  { name: 'Depth', type: 'knob' },
  { name: 'Limiter', type: 'knob' },
  { name: 'Compression', type: 'knob' },
  { name: 'EQ Shift', type: 'knob' },
];
export const AMP_KNOB_NAMES = AMP_KNOBS.map((k) => k.name);
