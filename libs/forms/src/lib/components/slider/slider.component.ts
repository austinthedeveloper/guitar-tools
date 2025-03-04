import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'guitar-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  @Input() formCtrl = new FormControl(0);
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
}
