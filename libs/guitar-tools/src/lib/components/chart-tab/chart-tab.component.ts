import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {TABS_DATA} from '@guitar/data';
@Component({
  selector: 'guitar-chart-tab',
  templateUrl: './chart-tab.component.html',
  styleUrls: ['./chart-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartTabComponent implements OnChanges {
@Input() strings = '6';
@Input() columns = 26;
@Input() tabs = TABS_DATA;
built: any[] = [];
  constructor() {
    this.mapStuff();
   }

ngOnChanges({strings, columns}: SimpleChanges): void {
 if(strings || columns) {
   this.mapStuff();
 }
}
private mapStuff() {
  const builtStrings = Array(+this.strings).fill(0).map((x,i)=>i);
  this.built = Array(+this.columns).fill(builtStrings);
  console.log('built', this.built);

}

}
