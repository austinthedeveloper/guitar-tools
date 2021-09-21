import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';

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
  @Input() startingFret = '0';

  constructor() {
    this.buildRows();
  }

  ngOnChanges({strings, rows}: SimpleChanges): void {
    if(strings || rows) {
      this.buildRows();
    }

  }

  private buildRows() {
    const builtStrings = Array(+this.strings).fill(0).map((x,i)=>i);


    this.built = Array(+this.rows).fill(builtStrings);
    console.log('h', this.built, builtStrings);
  }


}
