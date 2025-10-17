import { Component, Input } from '@angular/core';
import { PedalBoard } from '@guitar/interfaces';

@Component({
    selector: 'lib-pedalboard-display',
    templateUrl: './pedalboard-display.component.html',
    styleUrl: './pedalboard-display.component.scss',
    standalone: false
})
export class PedalboardDisplayComponent {
  @Input() pedalboard!: PedalBoard;
}
