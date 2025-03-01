import { KnobType } from '@guitar/interfaces';

export const PEDAL_KNOBS: KnobType[] = [
  { name: 'Level' },
  { name: 'Tone' },
  { name: 'Gain' },
  { name: 'Rate' },
  { name: 'Depth' },
  { name: 'Sustain' },
  { name: 'Attack' },
  { name: 'Decay' },
  { name: 'Release' },
  { name: 'Speed' },
  { name: 'Drive' },
  { name: 'Mix' },
  { name: 'Blend' },
  { name: 'Feedback' },
  { name: 'Delay Time' },
  { name: 'Modulation' },
];
export const PEDAL_KNOB_NAMES = PEDAL_KNOBS.map((k) => k.name);
