import { Component, Input } from '@angular/core';

@Component({
    selector: 'guitar-card',
    templateUrl: './guitar-card.component.html',
    styleUrls: ['./guitar-card.component.css'],
    standalone: false
})
export class GuitarCardComponent {
  @Input() header!: string;
}
