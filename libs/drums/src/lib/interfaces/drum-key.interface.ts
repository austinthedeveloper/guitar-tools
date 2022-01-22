export type DrumKeyHardness = 'soft' | 'medium' | 'hard';
export interface DrumKeyPress {
  key: number;
  hardness: number;
  timestamp: number;
}
