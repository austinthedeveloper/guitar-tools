import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'guitar-card',
  templateUrl: './guitar-card.component.html',
  styleUrls: ['./guitar-card.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class GuitarCardComponent {
  @Input() header!: string;
}
