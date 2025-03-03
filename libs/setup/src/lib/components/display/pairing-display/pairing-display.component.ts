import { Component, Input } from '@angular/core';
import { Pairing } from '@guitar/interfaces';

@Component({
  selector: 'lib-pairing-display',
  templateUrl: './pairing-display.component.html',
  styleUrl: './pairing-display.component.scss',
})
export class PairingDisplayComponent {
  @Input() pairing!: Pairing;
}
