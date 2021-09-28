import {ChordClass, ChordInterface} from '@guitar/interfaces';
import {orderBy} from 'lodash-es';

export const CHORDS_MOCK: ChordInterface[] = [
  new ChordClass('G', '1', [
    {
      "fret": "2",
      "string": "5"
    },
    {
      "fret": "3",
      "string": "1"
    },
    {
      "fret": "3",
      "string": "2"
    },
    {
      "fret": "3",
      "string": "6"
    }
  ]),
  new ChordClass('D', '1', [
   {
      "fret": "2",
      "string": "1"
    },
    {
      "fret": "2",
      "string": "3"
    },
    {
      "fret": "3",
      "string": "2"
    }
  ]),
  new ChordClass('A', '1', [
   {
      "fret": "2",
      "string": "2"
    },
    {
      "fret": "2",
      "string": "3"
    },
    {
      "fret": "2",
      "string": "4"
    }
  ], '2'),
  new ChordClass('B', '1', [
   {
      "fret": "2",
      "string": "1"
    },
    {
      "fret": "2",
      "string": "2"
    },
    {
      "fret": "2",
      "string": "3"
    },
    {
      "fret": "2",
      "string": "4"
    },
    {
      "fret": "2",
      "string": "5"
    },
    {
      "fret": "4",
      "string": "2"
    },
    {
      "fret": "4",
      "string": "3"
    },
    {
      "fret": "4",
      "string": "4"
    }
  ], '2'),
   new ChordClass('D', '3', [
   {
    "fret": "5",
    "string": "1"
  },
  {
    "fret": "5",
    "string": "2"
  },
  {
    "fret": "5",
    "string": "3"
  },
  {
    "fret": "5",
    "string": "4"
  },
  {
    "fret": "5",
    "string": "5"
  },
  {
    "fret": "6",
    "string": "2"
  },
  {
    "fret": "7",
    "string": "3"
  },
  {
    "fret": "7",
    "string": "4"
  }
  ], '2'),
  new ChordClass('C', '1', [
   {
      "fret": "1",
      "string": "2"
    },
    {
      "fret": "2",
      "string": "4"
    },
    {
      "fret": "3",
      "string": "5"
    }
  ], '1'),
]

export const CHORDS_MOCK_SORTED: ChordInterface[] = orderBy(CHORDS_MOCK, ['name', 'position'])
