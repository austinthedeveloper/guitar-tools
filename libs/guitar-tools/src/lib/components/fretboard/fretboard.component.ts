import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FretDotsHelper, TuningHelper } from '@guitar/helpers';
import { ChartTabNote, PressInterface, TuningChart } from '@guitar/interfaces';
import { orderBy } from 'lodash-es';

@Component({
  selector: 'guitar-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FretboardComponent implements OnChanges {
  @Input() strings = '6';
  @Input() columns = 22;
  @Input() dots: number[] = FretDotsHelper.dots;
  @Input() tabs: PressInterface[] = [];
  @Output() tabChange: EventEmitter<PressInterface[]> = new EventEmitter();
  built: any[] = [];
  disabled!: boolean;
  @Output() stringPressed = new EventEmitter();
  @Output() tabsChanged = new EventEmitter();

  @Input() tuning = 'standard';
  tuningChart: TuningChart[] = [];

  constructor(private fb: FormBuilder) {
    this.mapStuff();
    this.buildTuningChart();
  }

  ngOnChanges({ strings, columns, tuning }: SimpleChanges): void {
    if (strings || columns) {
      this.mapStuff();
    }
    if (tuning) {
      this.buildTuningChart();
    }
  }

  private mapStuff() {
    const builtStrings = Array(+this.strings)
      .fill(0)
      .map((x, i) => i)
      .reverse();
    this.built = Array(this.colCount).fill(builtStrings);
  }

  get colWidth(): string {
    return `${(100 / this.colCount).toString()}%`;
  }

  toggleActive(fret: number, str: number): void {
    if (this.disabled) return;
    const isActive = this.tabs.find(
      (v) => v.fret === fret.toString() && v.string === str.toString()
    );

    this.stringPressed.emit({ fret: fret.toString(), string: str.toString() });
    if (isActive) {
      switch (isActive.type) {
        case 'pressed':
          isActive.type = 'muted';
          break;

        case 'muted':
          {
            this.tabs = this.tabs.filter(
              (v) =>
                !(v.fret === fret.toString() && v.string === str.toString())
            );
          }
          break;
      }
    } else {
      this.tabs = [
        ...this.tabs,
        { fret: fret.toString(), string: str.toString(), type: 'pressed' },
      ];
    }
    this.onPressChange();
  }

  get colCount() {
    return +this.columns + 1;
  }

  private onPressChange() {
    const ordered = orderBy(this.tabs, ['fret', 'string']);
    this.tabsChanged.emit(ordered);
  }

  private buildTuningChart(): void {
    const tune: string[] = TuningHelper.getTuning(this.tuning);
    this.tuningChart = TuningHelper.buildTuningChart(tune);

    // TODO Remove this
    const test = TuningHelper.getMajorPentatonic('A');
    this.tabs = TuningHelper.buildNotes(test, this.tuningChart);
    console.log('tabs', this.tabs);
  }
}
