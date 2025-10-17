import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[knobRotate]',
    standalone: false
})
export class KnobRotateDirective {
  @Input() knobRotate: number = 0; // Accepts a number between 0-100

  constructor(private el: ElementRef) {}

  ngOnChanges({ knobRotate }: SimpleChanges) {
    if (knobRotate) {
      const degrees = (this.knobRotate / 100) * 270 - 135;
      this.el.nativeElement.style.transform = `rotate(${degrees}deg)`;
    }
  }
}
