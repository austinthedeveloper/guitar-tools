import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DrumKeyPress, DrumType } from '../../interfaces';

@Component({
  selector: 'guitar-drum-tab',
  templateUrl: './drum-tab.component.html',
  styleUrls: ['./drum-tab.component.scss'],
})
export class DrumTabComponent implements OnChanges {
  @Input() inputs: DrumKeyPress[] = [];
  built: DrumKeyPress[] = [];
  constructor() {}

  ngOnChanges({ inputs }: SimpleChanges): void {
    if (inputs) {
      this.mapInputs(this.inputs);
    }
  }

  private mapInputs(inputs: DrumKeyPress[]) {
    this.built = inputs.map((input) => {
      return {
        ...input,
        row: this.getRow(input.type),
      };
    });
  }

  private getRow(type: DrumType) {
    switch (type) {
      case 'snare':
        return 2;
      case 'tom1':
        return 1;
      case 'tom2':
        return 2;
      case 'tom3':
        return 3;
      case 'hiHat':
      case 'ride':
      case 'crash1':
      case 'crash2':
      case 'crash3':
        return 0;
      case 'kick':
        return 4;
      default:
        return 0;
    }
  }

  getRowData(rowIndex: number): DrumKeyPress[] {
    return this.built.filter((item) => item.row === rowIndex);
  }
}
