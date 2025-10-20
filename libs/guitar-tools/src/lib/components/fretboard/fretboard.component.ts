import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FretDotsHelper } from '@guitar/helpers';
import { PressInterface, TuningChart } from '@guitar/interfaces';
import { orderBy } from 'lodash-es';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FretDotPipe } from '../../pipes/fret-dot.pipe';
import { StringTypePipe } from '../../pipes/string-type.pipe';

@Component({
  selector: 'guitar-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatTooltipModule, StringTypePipe, FretDotPipe],
})
export class FretboardComponent implements OnChanges {
  @Input() strings = '6';
  @Input() columns = 22;
  @Input() dots: number[] = FretDotsHelper.dots;
  @Input() tabs: PressInterface[] = [];
  @Output() tabChange: EventEmitter<PressInterface[]> = new EventEmitter();
  @Input() disabled!: boolean;
  @Input() showNote!: boolean;
  @Output() stringPressed = new EventEmitter();
  @Output() tabsChanged = new EventEmitter();

  @Input() tuning = 'standard';
  @Input() tuningChart: TuningChart[] = [];
  tuningBuilt: TuningChart[] = [];
  stringOrder: number[] = [];
  fretPositions: number[] = [];

  constructor() {
    this.mapStuff();
  }

  ngOnChanges({ strings, columns, tuningChart }: SimpleChanges): void {
    if (strings || columns) {
      this.mapStuff();
    }
    if (tuningChart) {
      this.tuningBuilt = this.tuningChart.slice().reverse();
    }
  }

  private mapStuff() {
    const totalStrings = Math.max(+this.strings, 1);
    this.stringOrder = Array.from({ length: totalStrings }, (_, index) => index);
    this.fretPositions = Array.from(
      { length: this.colCount },
      (_, index) => index
    );
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

  getNoteLabel(stringIndex: number, fret: number): string | undefined {
    return (
      this.tuningBuilt[stringIndex]?.scale[fret] ??
      this.tuningChart[this.tuningChart.length - stringIndex - 1]?.scale[fret]
    );
  }
}
