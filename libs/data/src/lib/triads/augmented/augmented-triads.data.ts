import { ChordInterface } from '@guitar/interfaces';
import { TRIADS_POSITION_1_AUGMENTED } from './triads-position-1.data';
import { TRIADS_POSITION_2_AUGMENTED } from './triads-position-2.data';
import { TRIADS_POSITION_3_AUGMENTED } from './triads-position-3.data';

export const TRIADS_MOCK_AUGMENTED: ChordInterface[] = [
  ...TRIADS_POSITION_1_AUGMENTED,
  ...TRIADS_POSITION_2_AUGMENTED,
  ...TRIADS_POSITION_3_AUGMENTED,
];
