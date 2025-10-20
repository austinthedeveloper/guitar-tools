import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
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

  rows: TraditionalTabRow[] = [];
  columnIndexes: number[] = [];
  gridTemplateColumns = '';

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
}

function tabPositionToDisplay(position: string): string {
  const trimmed = position?.toString().trim();
  return trimmed.length ? trimmed : '0';
}
