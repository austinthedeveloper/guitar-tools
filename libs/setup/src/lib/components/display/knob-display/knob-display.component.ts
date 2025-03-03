import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-knob-display',
  templateUrl: './knob-display.component.html',
  styleUrl: './knob-display.component.scss',
})
export class KnobDisplayComponent {
  @Input() type: string = 'knob';
  @Input() value: number = 50;
  @Input() name!: string;
}
