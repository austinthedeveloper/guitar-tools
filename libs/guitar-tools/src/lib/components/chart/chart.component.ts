import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'guitar-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ChartComponent {}
