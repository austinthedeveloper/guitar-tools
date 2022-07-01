import { scaleStartWith } from '@guitar/helpers';
import { ChordClass, ChordInterface } from '@guitar/interfaces';

function CHORDS_MOCK_TRIADS_1(): ChordInterface[] {
  return scaleStartWith('A').map((string, index) => {
    const chords = [
      {
        fret: (index + 2).toString(),
        string: '3',
      },
      {
        fret: (index + 1).toString(),
        string: '4',
      },
      {
        fret: (index + 3).toString(),
        string: '5',
      },
    ];
    return new ChordClass(string, undefined, chords, 'Triad');
  });
}
function CHORDS_MOCK_TRIADS_2(): ChordInterface[] {
  return scaleStartWith('A').map((string, index) => {
    const chords = [
      {
        fret: (index + 1).toString(),
        string: '2',
      },
      {
        fret: (index + 2).toString(),
        string: '3',
      },
      {
        fret: (index + 1).toString(),
        string: '4',
      },
    ];
    return new ChordClass(string, undefined, chords, 'Triad');
  });
}
function CHORDS_MOCK_TRIADS_3(): ChordInterface[] {
  return scaleStartWith('A# / B♭').map((string, index) => {
    const chords = [
      {
        fret: index.toString(),
        string: '1',
      },
      {
        fret: (index + 2).toString(),
        string: '2',
      },
      {
        fret: (index + 3).toString(),
        string: '3',
      },
    ];
    return new ChordClass(string, undefined, chords, 'Triad');
  });
}
export const TRIADS_POSITION_2_DIMINISHED = [
  ...CHORDS_MOCK_TRIADS_1(),
  ...CHORDS_MOCK_TRIADS_2(),
  ...CHORDS_MOCK_TRIADS_3(),
];
