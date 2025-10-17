import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-metronome-bars',
    imports: [CommonModule],
    templateUrl: './metronome-bars.component.html',
    styleUrls: ['./metronome-bars.component.css']
})
export class MetronomeBarsComponent {
  @Input() bars: number[] = []; // Array representing the bars
  @Input() activeBar: number = 0; // Currently active bar
}
