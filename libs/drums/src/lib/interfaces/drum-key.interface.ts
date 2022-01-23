import { DrumType } from './drum-types.interface';

export type DrumKeyHardness = 'soft' | 'medium' | 'hard';
export interface DrumKeyPress {
  key: number;
  hardness: number;
  timestamp: number;
  type?: DrumType;
}
