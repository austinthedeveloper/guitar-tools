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
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { TABS_DATA_DEMO } from '@guitar/data';
import { ChartTabNote } from '@guitar/interfaces';

import { TabStringTypePipe } from '../../pipes/tab-string-type.pipe';
@Component({
  selector: 'guitar-chart-tab',
  templateUrl: './chart-tab.component.html',
  styleUrls: ['./chart-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TabStringTypePipe],
})
export class ChartTabComponent implements OnChanges {
  @Input() strings = '6';
  @Input() columns = 26;
  @Input() tabs: ChartTabNote[] = TABS_DATA_DEMO;
  @Output() tabChange: EventEmitter<ChartTabNote[]> = new EventEmitter();
  built: any[] = [];
  form = this.fb.group({
    string: this.fb.control('', [Validators.required]),
    position: this.fb.control('', [Validators.required]),
    order: this.fb.control('', [Validators.required]),
  });
  constructor(private fb: UntypedFormBuilder) {
    this.mapStuff();
  }

  ngOnChanges({ strings, columns }: SimpleChanges): void {
    if (strings || columns) {
      this.mapStuff();
    }
  }
  private mapStuff() {
    const builtStrings = Array(+this.strings)
      .fill(0)
      .map((x, i) => i);
    this.built = Array(+this.columns).fill(builtStrings);
  }

  get colWidth(): string {
    return `${(100 / this.columns).toString()}%`;
  }

  setActive(activePress: ChartTabNote) {
    this.form.reset();
    this.form.patchValue(activePress);
  }

  setActiveNew(order: number, string: number) {
    this.form.reset();
    this.form.patchValue({
      string: string.toString(),
      order: order.toString(),
    });
  }

  save(activePress: ChartTabNote) {
    activePress.position = activePress.position.toString();
    const filtered = this.tabs.filter(
      (item) =>
        !(
          item.string === activePress.string && item.order === activePress.order
        )
    );
    this.tabs = [...filtered, activePress];
    this.tabChange.emit(this.tabs);
  }
}
