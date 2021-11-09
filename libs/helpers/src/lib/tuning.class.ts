import {
  GuitarTuningStorage,
  PressInterface,
  TuningChart,
  ScaleTypesInterface,
} from '@guitar/interfaces';
import { scaleStartWith } from './scale.class';
export const GUITAR_TUNING: GuitarTuningStorage = {
  standard: ['E', 'A', 'D', 'G', 'B', 'E'],
  dropD: ['D', 'A', 'D', 'G', 'B', 'E'],
  dropC: ['C', 'G', 'C', 'F', 'A', 'D'],
  dropB: ['B', 'F #', 'B', 'E', 'G', 'C'],
};

export const SCALE_TYPES: { [key: string]: ScaleTypesInterface } = {
  majorPentatonic: {
    name: 'Major Pentatonic',
    positions: [0, 2, 4, 7, 9],
  },
  minorPentatonic: {
    name: 'Minor Pentatonic',
    positions: [0, 3, 5, 7, 10],
  },
  bluesPentatonic: {
    name: 'Pentatonic Blues',
    positions: [0, 3, 5, 6, 7, 10],
  },
  neutralPentatonic: {
    name: 'Neutral Pentatonic',
    positions: [0, 2, 5, 7, 10],
  },
  major: {
    name: 'Major',
    positions: [0, 2, 4, 5, 7, 9, 11],
  },
  harmonicMinor: {
    name: 'Harmonic Minor',
    positions: [0, 2, 3, 5, 7, 8, 11],
  },
  melodicMinor: {
    name: 'Melodic Minor',
    positions: [0, 2, 3, 5, 7, 9, 11],
  },
  naturalMinor: {
    name: 'Natural Minor',
    positions: [0, 2, 3, 5, 7, 8, 10],
  },
  ionian: {
    name: 'Ionian',
    positions: [0, 2, 4, 5, 7, 9, 11],
  },
  dorian: {
    name: 'Dorian',
    positions: [0, 2, 3, 5, 7, 9, 10],
  },
  phyrgian: {
    name: 'Phyrgian',
    positions: [0, 1, 3, 5, 7, 8, 10],
  },
  lydian: {
    name: 'Lydian',
    positions: [0, 2, 4, 6, 7, 9, 11],
  },
};
export class TuningHelper {
  static buildTuningChart(tune: string[]): TuningChart[] {
    return tune.map((t) => {
      return {
        key: t,
        scale: scaleStartWith(t),
      };
    });
  }
  static getTuning(tune: string): string[] {
    return GUITAR_TUNING[tune];
  }
  static getMajorPentatonic(key: string): string[] {
    const positions = [0, 2, 4, 7, 9];

    return this.getScale(key, positions);
  }
  static getMinorPentatonic(key: string): string[] {
    const positions = [0, 3, 5, 7, 10];
    return this.getScale(key, positions);
  }

  static getScaleByKeyAndType(key: string, type: string): string[] {
    const obj: ScaleTypesInterface = SCALE_TYPES[type];
    return obj ? this.getScale(key, obj.positions) : [];
  }

  private static getScale(key: string, positions: number[]) {
    const scale = scaleStartWith(key);
    return positions.reduce((prev, curr) => {
      return [...prev, scale[curr]];
    }, [] as string[]);
  }

  static buildNotes(scale: string[], chart: TuningChart[]): PressInterface[] {
    const rootNote = scale[0];
    return chart
      .slice()
      .reverse()
      .reduce((prev, curr, index) => {
        const mapped: PressInterface[] = curr.scale
          .map((s, i) => {
            const rootClass = rootNote === s ? 'pressed-root' : '';
            return {
              fret: i.toString(),
              string: (index + 1).toString(),
              type: scale.includes(s) ? `pressed ${rootClass}` : undefined,
            };
          })
          .filter((item) => !!item.type);
        const secondScale: PressInterface[] = mapped.map((item) => ({
          ...item,
          fret: (+item.fret + 12).toString(),
        }));

        return [...prev, ...mapped, ...secondScale];
      }, [] as PressInterface[]);
  }

  static get getScaleOptions() {
    return Object.entries(SCALE_TYPES).reduce((prev, [key, curr]) => {
      return [...prev, { key: curr.name, value: key }];
    }, [] as any[]);
  }
}
