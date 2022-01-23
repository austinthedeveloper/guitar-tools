import { DrumType } from './drum-types.interface';

export type DrumKeyHardness = 'soft' | 'medium' | 'hard';
export interface DrumKeyPress {
  key: number;
  hardness: number;
  hardnessType?: DrumKeyHardness;
  timestamp: number;
  type?: DrumType;
  row?: number;
}
