import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fretDot',
    standalone: false
})
export class FretDotPipe implements PipeTransform {
  transform(dot: number, dots: number[]): string {
    if (!dots.includes(dot)) return '';

    switch (dot) {
      case 12: {
        return 'fretboard-dots';
      }
      default: {
        return 'fretboard-dot';
      }
    }
  }
}
