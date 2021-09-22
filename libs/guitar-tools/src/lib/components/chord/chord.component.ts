import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import {minBy, orderBy} from 'lodash-es';
@Component({
  selector: 'guitar-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChordComponent implements OnChanges {
  @Input() strings = '6';
  @Input() rows = '6';
  built: any[] = [];
  @Input() startingFret = '';
  @Input() disabled = false;
  @Input() presses: any[] = [];
  @Output() stringPressed = new EventEmitter();
  @Output() pressesChanged = new EventEmitter();

  constructor() {
    this.buildRows();
  }

  ngOnChanges({strings, rows, presses}: SimpleChanges): void {
    if(strings || rows) {
      this.buildRows();
    }
    if(presses) {
      this.setInitialFret();
    }

  }

  private buildRows() {
    const builtStrings = Array(+this.strings).fill(0).map((x,i)=>i);
    this.built = Array(+this.rows).fill(builtStrings);
  }

  private setInitialFret() {
    this.startingFret = this.startingFret || minBy(this.presses, press => +press.fret).fret;
  }

  toggleActive(fret: number, str: number): void {
    if(this.disabled) return;
    const isActive = this.presses.find(v => (v.fret === fret.toString() && v.string === str.toString()))
    this.stringPressed.emit({fret: fret.toString(), string: str.toString()});
    if(isActive) {
      this.presses = this.presses.filter(v => !(v.fret === fret.toString() && v.string === str.toString()))
    } else {
      this.presses = [...this.presses, {fret: fret.toString(), string: str.toString()}]
    }
    this.onPressChange();
  }

  private onPressChange() {
    const ordered = orderBy(this.presses, ['fret', 'string'])
    this.pressesChanged.emit(ordered);
  }


}
