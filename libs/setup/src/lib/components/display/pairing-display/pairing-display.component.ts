import { Component, Input } from '@angular/core';
import { Pairing } from '@guitar/interfaces';

@Component({
    selector: 'lib-pairing-display',
    templateUrl: './pairing-display.component.html',
    styleUrl: './pairing-display.component.scss',
    standalone: false
})
export class PairingDisplayComponent {
  @Input() pairing!: Pairing;
}
