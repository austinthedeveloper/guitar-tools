import { ChordInterface } from '@guitar/interfaces';
import { orderBy } from 'lodash-es';

import { CHORDS_MOCK } from './bar-chords';
import {
  TRIADS_MINOR_MOCK,
  TRIADS_MOCK,
  TRIADS_MOCK_AUGMENTED,
  TRIADS_MOCK_DIMINISHED,
} from './triads';

export const CHORDS_MOCK_SORTED: ChordInterface[] = orderChords(CHORDS_MOCK);

export const TRIADS_MOCK_SORTED: ChordInterface[] = orderChords(TRIADS_MOCK);

export const TRIADS_MOCK_MINOR_SORTED: ChordInterface[] =
  orderChords(TRIADS_MINOR_MOCK);

export const TRIADS_MOCK_AUGMENTED_SORTED: ChordInterface[] = orderChords(
  TRIADS_MOCK_AUGMENTED
);

export const TRIADS_MOCK_DIMINISHED_SORTED: ChordInterface[] = orderChords(
  TRIADS_MOCK_DIMINISHED
);

function orderChords(chords: ChordInterface[]): ChordInterface[] {
  return orderBy(chords, ['name', 'position']);
}
