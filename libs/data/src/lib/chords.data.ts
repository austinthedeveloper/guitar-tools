import { scaleStartWith } from '@guitar/helpers';
import { ChordClass, ChordInterface } from '@guitar/interfaces';
import { orderBy } from 'lodash-es';
import { TRIADS_POSITION_1 } from './triads-position-1.data';
import { TRIADS_POSITION_3 } from './triads-position-3.data';

export function CHORDS_MOCK_POSITION_1(): ChordInterface[] {
  const scale = scaleStartWith('A');
  return scale.map((string, index) => {
    const indexStr = index.toString();
    const chords = [
      {
        fret: indexStr,
        string: '1',
      },

      {
        fret: (index + 1).toString(),
        string: '2',
      },
      {
        fret: indexStr,
        string: '3',
      },
      {
        fret: (index + 2).toString(),
        string: '4',
      },
      {
        fret: (index + 3).toString(),
        string: '5',
      },
    ];
    const name = scale[index + 3] || scale[+chords[4].fret - 12];
    return new ChordClass(name, undefined, chords, '1');
  });
}
export function CHORDS_MOCK_POSITION_2(): ChordInterface[] {
  return scaleStartWith('A').map((string, index) => {
    const indexStr = index.toString();
    const chords = [
      {
        fret: indexStr,
        string: '1',
      },
      {
        fret: indexStr,
        string: '5',
      },
      {
        fret: (index + 2).toString(),
        string: '2',
      },
      {
        fret: (index + 2).toString(),
        string: '3',
      },
      {
        fret: (index + 2).toString(),
        string: '4',
      },
    ];
    return new ChordClass(string, undefined, chords, '2');
  });
}
export function CHORDS_MOCK_POSITION_3(): ChordInterface[] {
  return scaleStartWith('E').map((string, index) => {
    const indexStr = index.toString();
    const chords = [
      {
        fret: indexStr,
        string: '1',
      },
      {
        fret: indexStr,
        string: '2',
      },
      {
        fret: indexStr,
        string: '6',
      },
      {
        fret: (index + 1).toString(),
        string: '3',
      },
      {
        fret: (index + 2).toString(),
        string: '4',
      },
      {
        fret: (index + 2).toString(),
        string: '5',
      },
    ];
    return new ChordClass(string, undefined, chords, '3');
  });
}

export const CHORDS_MOCK: ChordInterface[] = [
  // ...CHORDS_MOCK_POSITION_1(),
  // ...CHORDS_MOCK_POSITION_2(),
  // ...CHORDS_MOCK_POSITION_3(),
  ...TRIADS_POSITION_3,
  ...TRIADS_POSITION_1,
];
console.log('hit', CHORDS_MOCK);

export const CHORDS_MOCK_SORTED: ChordInterface[] = orderBy(CHORDS_MOCK, [
  'name',
  'position',
]);
