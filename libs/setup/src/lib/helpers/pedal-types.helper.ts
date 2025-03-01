import { PedalType } from '@guitar/interfaces';

export const PEDAL_TYPES: PedalType[] = [
  { name: 'Overdrive', color: '#e04141' }, // Red
  { name: 'Distortion', color: '#ff6600' }, // Orange
  { name: 'Fuzz', color: '#ffcc00' }, // Yellow
  { name: 'Tuner', color: '#4caf50' }, // Green
  { name: 'Equalizer', color: '#2196f3' }, // Blue
  { name: 'Chorus', color: '#673ab7' }, // Purple
  { name: 'Delay', color: '#ff69b4' }, // Pink
  { name: 'Reverb', color: '#9c27b0' }, // Dark Purple
  { name: 'Compressor', color: '#795548' }, // Brown
  { name: 'Phaser', color: '#607d8b' }, // Gray
  { name: 'Flanger', color: '#009688' }, // Teal
  { name: 'Wah', color: '#cddc39' }, // Lime
  { name: 'Boost', color: '#ff5722' }, // Deep Orange
  { name: 'Tremolo', color: '#3f51b5' }, // Indigo
  { name: 'Looper', color: '#000000' }, // Black
];

// Extract just the names for dropdowns
export const PEDAL_TYPE_NAMES = PEDAL_TYPES.map((p) => p.name);
