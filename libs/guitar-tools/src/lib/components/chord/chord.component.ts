import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'guitar-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChordComponent implements OnChanges {
  @Input() strings = 6;
  @Input() rows = 6;
  built: any[] = [];

  constructor() {
    this.buildRows();
  }

  ngOnChanges({strings, rows}: SimpleChanges): void {
    if(strings || rows) {
      this.buildRows();
    }

  }

  private buildRows() {
    const builtStrings = Array(this.strings).fill('').map((x,i)=>i);
    console.log('h', builtStrings);

    this.built = Array(this.rows).fill(builtStrings);
  }


}
