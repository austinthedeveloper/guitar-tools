import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
import {minBy} from 'lodash-es';
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
  @Input() presses: any[] = []

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
    const isActive = this.presses.find(v => (v.fret === fret.toString() && v.string === str.toString()))
    if(isActive) {
      this.presses = this.presses.filter(v => !(v.fret === fret.toString() && v.string === str.toString()))
    } else {
      this.presses = [...this.presses, {fret: fret.toString(), string: str.toString()}]
    }
  }


}
