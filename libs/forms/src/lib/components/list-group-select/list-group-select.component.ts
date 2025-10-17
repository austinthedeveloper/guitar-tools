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

@Component({
    selector: 'guitar-list-group-select',
    templateUrl: './list-group-select.component.html',
    styleUrls: ['./list-group-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ListGroupSelectComponent implements OnChanges {
  @Input() items: string[] = [];
  @Input() values: string[] | string;

  options: { value: string; active: boolean }[] = [];

  @Output() onClick: EventEmitter<string> = new EventEmitter();
  @Output() onCorrect: EventEmitter<string> = new EventEmitter();
  @Output() onIncorrect: EventEmitter<string> = new EventEmitter();

  ngOnChanges({ items, values }: SimpleChanges): void {
    // items build when either values or items are triggered
    if (items || values) {
      this.buildOptions(this.items);
    }
  }

  private buildOptions(items: string[]) {
    this.options = items.map((item) => ({ value: item, active: false }));
  }

  itemClicked(item: { value: string; active: boolean }) {
    item.active = true;
    this.onClick.emit(item.value);
    if (this.valuesInclude(item.value)) {
      this.onCorrect.emit(item.value);
    } else {
      this.onIncorrect.emit(item.value);
    }
  }

  activeV(item: { value: string; active: boolean }) {
    if (!item.active) return '';
    if (this.valuesInclude(item.value)) {
      return 'bg-success text-white';
    } else {
      return 'bg-danger text-white';
    }
  }

  private valuesInclude(value: string): boolean {
    const arr: string[] = Array.isArray(this.values)
      ? this.values
      : [this.values];
    return arr.includes(value);
  }
}
