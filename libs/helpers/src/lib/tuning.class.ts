import { GuitarTuningStorage, TuningChart } from '@guitar/interfaces';
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
}
