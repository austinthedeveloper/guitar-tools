import { KnobType } from '@guitar/interfaces';

export const AMP_INPUTS: KnobType[] = [
  { name: 'Input 1', type: 'input' },
  { name: 'Input 2', type: 'input' },
];
export const AMP_INPUT_NAMES = AMP_INPUTS.map((k) => k.name);
