import { Component, Input, OnInit } from '@angular/core';
import { Pedal } from '@guitar/interfaces';

@Component({
  selector: 'lib-pedal-display',
  templateUrl: './pedal-display.component.html',
  styleUrls: ['./pedal-display.component.scss'],
})
export class PedalDisplayComponent {
  @Input() pedal!: Pedal;
  @Input() values: Record<string, number> = {};
  @Input() toggle = false;
}
