import {
  GuitarTuningStorage,
  PressInterface,
  TuningChart,
} from '@guitar/interfaces';
import { scaleStartWith } from './scale.class';
export const GUITAR_TUNING: GuitarTuningStorage = {
  standard: ['E', 'A', 'D', 'G', 'B', 'E'],
  dropD: ['D', 'A', 'D', 'G', 'B', 'E'],
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
    const scale = scaleStartWith(key);
    return positions.reduce((prev, curr) => {
      return [...prev, scale[curr]];
    }, [] as string[]);
  }
  static getMinorPentatonic(key: string): string[] {
    const positions = [0, 3, 5, 7, 10];
    const scale = scaleStartWith(key);
    return positions.reduce((prev, curr) => {
      return [...prev, scale[curr]];
    }, [] as string[]);
  }

  static buildNotes(scale: string[], chart: TuningChart[]): PressInterface[] {
    return chart.reduce((prev, curr) => {
      console.log('build notes', prev, curr, scale);

      return [];
    }, [] as PressInterface[]);
  }
}
