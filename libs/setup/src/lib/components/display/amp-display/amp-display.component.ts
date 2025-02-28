import { Component, Input } from '@angular/core';
import { Amp } from '@guitar/interfaces';

@Component({
  selector: 'lib-amp-display',
  templateUrl: './amp-display.component.html',
  styleUrl: './amp-display.component.scss',
})
export class AmpDisplayComponent {
  @Input() amp!: Amp;
}
