export type GuitarTuning = string[];
export interface GuitarTuningStorage  {[key: string]: GuitarTuning}

export interface TuningChart {
        key: string,
        scale: string[]
      }
