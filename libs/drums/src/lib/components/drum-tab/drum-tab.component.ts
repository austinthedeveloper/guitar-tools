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
  @Input() inputs: DrumKeyPress[][] = [];
  @Input() rows: number;
  built: DrumKeyPress[] = [];
  constructor() {}

  ngOnChanges({}: SimpleChanges): void {}

  getRowData(rowIndex: number, index: number): DrumKeyPress[] {
    return this.inputs[index].filter((item) => item.row === rowIndex);
  }
}
