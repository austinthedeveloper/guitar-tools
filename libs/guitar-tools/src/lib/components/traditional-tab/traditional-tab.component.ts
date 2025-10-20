import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { ChartTabNote } from '@guitar/interfaces';
import { TABS_DATA_DEMO } from '@guitar/data';

interface TraditionalTabCell {
  order: number;
  value: string | null;
}

interface TraditionalTabRow {
  label: string;
  stringIndex: number;
  cells: TraditionalTabCell[];
}

interface ActiveCell {
  stringIndex: number;
  order: number;
}

@Component({
  selector: 'guitar-traditional-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traditional-tab.component.html',
  styleUrls: ['./traditional-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TraditionalTabComponent implements OnInit, OnChanges {
  @Input() strings = 6;
  @Input() columns = 16;
  @Input() tabs: ChartTabNote[] = TABS_DATA_DEMO;
  @Input() chords: string[] = [];
  @Input() shapes: string[] = [];
  @Input() beatsPerBar = 4;
  @Input() editable = false;
  @Output() tabsChange = new EventEmitter<ChartTabNote[]>();
  @ViewChildren('cellInput') private cellInputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  rows: TraditionalTabRow[] = [];
  columnIndexes: number[] = [];
  gridTemplateColumns = '';
  activeCell: ActiveCell | null = null;
  activeValue = '';

  private readonly standardLabels = ['e', 'b', 'g', 'd', 'a', 'E'];

  ngOnInit(): void {
    this.buildRows();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['strings'] ||
      changes['columns'] ||
      changes['tabs'] ||
      changes['chords'] ||
      changes['shapes'] ||
      changes['beatsPerBar']
    ) {
      this.buildRows();
    }
  }

  get hasHeaderMeta(): boolean {
    return !!(this.chords?.length || this.shapes?.length);
  }

  isEditingCell(stringIndex: number, order: number): boolean {
    return (
      this.activeCell?.stringIndex === stringIndex &&
      this.activeCell?.order === order
    );
  }

  startEdit(stringIndex: number, order: number, initialValue: string | null) {
    if (!this.editable) {
      return;
    }
    this.activeCell = { stringIndex, order };
    this.activeValue = initialValue ?? '';
    this.scheduleInputFocus();
  }

  onCellValueChange(value: string): void {
    this.activeValue = value;
  }

  onCellInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.commitActiveValue();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelActiveEdit();
    }
  }

  onCellInputBlur(): void {
    if (!this.activeCell) {
      return;
    }
    this.commitActiveValue();
  }

  private commitActiveValue(): void {
    if (!this.activeCell) {
      return;
    }

    const { stringIndex, order } = this.activeCell;
    const value = this.activeValue;

    this.activeCell = null;
    this.activeValue = '';
    this.updateTabValue(stringIndex, order, value);
  }

  private cancelActiveEdit(): void {
    this.activeCell = null;
    this.activeValue = '';
  }

  private scheduleInputFocus(): void {
    setTimeout(() => this.focusActiveInput());
  }

  private focusActiveInput(): void {
    const inputRef = this.cellInputs?.first;
    const element = inputRef?.nativeElement;
    if (element) {
      element.focus();
      element.select();
    }
  }

  private buildRows(): void {
    const stringCount = this.coercePositiveInteger(this.strings, 6);
    const columnCount = this.coercePositiveInteger(this.columns, 16);

    this.columnIndexes = Array.from(
      { length: columnCount },
      (_, order) => order
    );
    this.gridTemplateColumns = `repeat(${columnCount}, minmax(1.75rem, 1fr))`;

    const labels = this.buildStringLabels(stringCount);

    this.rows = labels.map((label, stringIndex) => ({
      label,
      stringIndex,
      cells: this.columnIndexes.map((order) => ({
        order,
        value: this.lookupTabValue(stringIndex, order),
      })),
    }));
  }

  private lookupTabValue(stringIndex: number, order: number): string | null {
    if (!Array.isArray(this.tabs)) {
      return null;
    }

    const match = this.tabs.find(
      (tab) =>
        Number.parseInt(tab.string, 10) === stringIndex &&
        Number.parseInt(tab.order, 10) === order
    );

    return match ? tabPositionToDisplay(match.position) : null;
  }

  private buildStringLabels(count: number): string[] {
    if (count <= this.standardLabels.length) {
      return this.standardLabels.slice(0, count);
    }

    const overflow = Array.from(
      { length: count - this.standardLabels.length },
      (_, index) => `S${this.standardLabels.length + index + 1}`
    );

    return [...this.standardLabels, ...overflow];
  }

  private coercePositiveInteger(value: unknown, fallback: number): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 1) {
      return fallback;
    }
    return Math.floor(parsed);
  }

  private updateTabValue(
    stringIndex: number,
    order: number,
    position: string | null
  ): void {
    const trimmed = position?.toString().trim() ?? '';

    const withoutExisting = this.tabs.filter(
      (tab) => !this.matchesTab(tab, stringIndex, order)
    );

    const nextTabs =
      trimmed.length > 0
        ? [
            ...withoutExisting,
            {
              string: stringIndex.toString(),
              order: order.toString(),
              position: trimmed,
            },
          ]
        : withoutExisting;

    const sortedTabs = this.sortTabs(nextTabs);
    this.applyTabChanges(sortedTabs);
  }

  private matchesTab(
    tab: ChartTabNote,
    stringIndex: number,
    order: number
  ): boolean {
    return (
      Number.parseInt(tab.string, 10) === stringIndex &&
      Number.parseInt(tab.order, 10) === order
    );
  }

  private sortTabs(notes: ChartTabNote[]): ChartTabNote[] {
    return [...notes].sort((a, b) => {
      const orderDiff =
        Number.parseInt(a.order, 10) - Number.parseInt(b.order, 10);
      if (orderDiff !== 0) {
        return orderDiff;
      }
      return (
        Number.parseInt(a.string, 10) - Number.parseInt(b.string, 10)
      );
    });
  }

  private applyTabChanges(nextTabs: ChartTabNote[]): void {
    this.tabs = nextTabs;
    this.buildRows();
    this.tabsChange.emit(nextTabs);
  }
}

function tabPositionToDisplay(position: string): string {
  const trimmed = position?.toString().trim();
  return trimmed.length ? trimmed : '0';
}
