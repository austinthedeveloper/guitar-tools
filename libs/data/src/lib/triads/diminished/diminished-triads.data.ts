import { ChordInterface } from '@guitar/interfaces';
import { TRIADS_POSITION_1_DIMINISHED } from './triads-position-1.data';
import { TRIADS_POSITION_2_DIMINISHED } from './triads-position-2.data';
import { TRIADS_POSITION_3_DIMINISHED } from './triads-position-3.data';

export const TRIADS_MOCK_DIMINISHED: ChordInterface[] = [
  // ...TRIADS_POSITION_1_DIMINISHED,
  // ...TRIADS_POSITION_2_DIMINISHED,
  ...TRIADS_POSITION_3_DIMINISHED,
];
