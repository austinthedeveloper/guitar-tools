import { ChordInterface } from '@guitar/interfaces';
import { TRIADS_POSITION_1 } from './triads-position-1.data';
import { TRIADS_POSITION_2 } from './triads-position-2.data';
import { TRIADS_POSITION_3 } from './triads-position-3.data';

export const TRIADS_MOCK: ChordInterface[] = [
  ...TRIADS_POSITION_1,
  ...TRIADS_POSITION_2,
  ...TRIADS_POSITION_3,
];
