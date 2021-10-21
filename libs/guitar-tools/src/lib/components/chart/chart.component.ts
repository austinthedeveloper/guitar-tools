import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'guitar-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
