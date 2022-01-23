import { DrumKeyPress, DrumKeyHardness, DrumType } from '../interfaces';

export class DrumKeyClass implements DrumKeyPress {
  key: number;
  hardness: number;
  timestamp: number;
  hardnessType: DrumKeyHardness = 'soft';
  type!: DrumType;
  constructor(
    key: number,
    hardness: number,
    timestamp: number,
    type?: DrumType
  ) {
    this.key = key;
    this.hardness = hardness;
    this.timestamp = timestamp;
    this.setHardnessType(hardness);
    this.type = type || 'unknown';
  }

  private setHardnessType(hardness: number) {
    if (hardness < 30) {
      this.hardnessType = 'soft';
    } else if (hardness >= 30 && hardness < 75) {
      this.hardnessType = 'medium';
    } else if (hardness >= 75) {
      this.hardnessType = 'hard';
    }
  }
}
