import { KnobType } from '@guitar/interfaces';

export const PEDAL_KNOBS: KnobType[] = [
  { name: 'Level', type: 'knob' },
  { name: 'Tone', type: 'knob' },
  { name: 'Gain', type: 'knob' },
  { name: 'Rate', type: 'knob' },
  { name: 'Depth', type: 'knob' },
  { name: 'Sustain', type: 'knob' },
  { name: 'Attack', type: 'knob' },
  { name: 'Decay', type: 'knob' },
  { name: 'Release', type: 'knob' },
  { name: 'Speed', type: 'knob' },
  { name: 'Drive', type: 'knob' },
  { name: 'Mix', type: 'knob' },
  { name: 'Blend', type: 'knob' },
  { name: 'Feedback', type: 'knob' },
  { name: 'Delay Time', type: 'knob' },
  { name: 'Modulation', type: 'knob' },
];
export const PEDAL_KNOB_NAMES = PEDAL_KNOBS.map((k) => k.name);
