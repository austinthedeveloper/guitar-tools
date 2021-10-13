import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import {minBy, orderBy} from 'lodash-es';
import {PressInterface, TuningChart} from '@guitar/interfaces'
import { GUITAR_TUNING, scaleStartWith } from '@guitar/helpers';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'guitar-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChordComponent implements OnChanges {
  @Input() strings = '6';
  @Input() rows = '6';
  @Input() tuning = 'standard';
  built: any[] = [];
  @Input() startingFret = '';
  @Input() disabled = false;
  @Input() removeDuplicate = true;
  @Input() presses: PressInterface[] = [];
  @Output() stringPressed = new EventEmitter();
  @Output() pressesChanged = new EventEmitter();

  tuningChart: TuningChart[] = [];

  form: FormControl = new FormControl('')

  constructor() {
    this.buildRows();
    this.buildTuningChart();
    this.setInitialFret();
  }

  ngOnChanges({strings, rows, presses, tuning}: SimpleChanges): void {
    if(strings || rows) {
      this.buildRows();
    }
    if(presses) {
      this.setInitialFret();
    }
    if(tuning) {
      this.buildTuningChart();
    }

  }

  private buildRows(): void {
    const builtStrings = Array(+this.strings).fill(0).map((x,i)=>i);
    this.built = Array(+this.rows).fill(builtStrings);
  }

  private setInitialFret(): void {
    this.form.patchValue(this.getFretValue());
  }

  private getFretValue(): string {
    const hasStartFret: boolean = (+this.startingFret) > 0;
    if(hasStartFret) {return this.startFret.toString();}
    const minByFret: string = minBy(this.presses, press => +press.fret)?.fret as string;
    return (Number(minByFret) > 0) ? minByFret : '1';
  }

  private buildTuningChart(): void {
    const tune: string[] = GUITAR_TUNING[this.tuning];
    this.tuningChart = tune.map(t => {
      return {
        key: t,
        scale: scaleStartWith(t)
      }
    });
  }

  toggleActive(fret: number, str: number): void {
    if(this.disabled) return;
    const isActive = this.presses.find(v => (v.fret === fret.toString() && v.string === str.toString()));
    // isActive.type = 'farts';
    console.log('isActive', isActive);

    this.stringPressed.emit({fret: fret.toString(), string: str.toString()});
    if(isActive) {
      switch (isActive.type) {
        case 'pressed':
          isActive.type = 'muted';
          break;

        case 'muted': {
          this.presses = this.presses.filter(v => !(v.fret === fret.toString() && v.string === str.toString()))
        }
          break;
      }
      // isActive.type = 'farts';
      console.log('hit', this.presses, isActive);

      // this.presses = this.presses.filter(v => !(v.fret === fret.toString() && v.string === str.toString()))
    } else {
      this.presses = [...this.presses, {fret: fret.toString(), string: str.toString(), type: 'pressed'}]
    }
    this.onPressChange();
  }

  private onPressChange() {
    const ordered = orderBy(this.presses, ['fret', 'string'])
    this.pressesChanged.emit(ordered);
  }

  get startFret(): number {
    return +(this.form.value as string);
  }
}
