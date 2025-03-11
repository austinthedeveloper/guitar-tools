import { PedalType } from '@guitar/interfaces';

export const PEDAL_TYPES: PedalType[] = [
  { name: 'Looper', color: '#000000', order: 0 },
  { name: 'Tuner', color: '#4caf50', order: 1 },
  { name: 'Compressor', color: '#795548', order: 2 },
  { name: 'Boost', color: '#ff5722', order: 3 },
  { name: 'Overdrive', color: '#e04141', order: 4 },
  { name: 'Distortion', color: '#ff6600', order: 5 },
  { name: 'Fuzz', color: '#ffcc00', order: 6 },
  { name: 'Equalizer', color: '#2196f3', order: 7 },
  { name: 'Chorus', color: '#673ab7', order: 8 },
  { name: 'Phaser', color: '#607d8b', order: 9 },
  { name: 'Flanger', color: '#009688', order: 10 },
  { name: 'Tremolo', color: '#3f51b5', order: 11 },
  { name: 'Wah', color: '#cddc39', order: 12 },
  { name: 'Delay', color: '#ff69b4', order: 13 },
  { name: 'Reverb', color: '#9c27b0', order: 14 },
];

// Extract just the names for dropdowns
export const PEDAL_TYPE_NAMES = PEDAL_TYPES.map((p) => p.name);

export const PEDAL_TYPE_ORDER_MAP = PEDAL_TYPES.reduce<Record<string, number>>(
  (acc, type) => {
    acc[type.name] = type.order;
    return acc;
  },
  {}
);
