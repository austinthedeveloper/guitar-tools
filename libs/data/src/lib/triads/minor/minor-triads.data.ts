import { ChordInterface } from '@guitar/interfaces';
import { TRIADS_POSITION_MINOR_1 } from './triads-position-1.data';
import { TRIADS_POSITION_MINOR_2 } from './triads-position-2.data';
import { TRIADS_POSITION_MINOR_3 } from './triads-position-3.data';

export const TRIADS_MINOR_MOCK: ChordInterface[] = [
  ...TRIADS_POSITION_MINOR_1,
  ...TRIADS_POSITION_MINOR_2,
  ...TRIADS_POSITION_MINOR_3,
];
