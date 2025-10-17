import { Pipe, PipeTransform } from '@angular/core';
import { PressInterface } from '@guitar/interfaces';

@Pipe({
  name: 'isMuted',
  standalone: true,
})
export class IsMutedPipe implements PipeTransform {

  transform(value: PressInterface[], fret: number, string: number): boolean {
    const match = value.find(v => (v.fret === fret.toString() && v.string === string.toString()))
    return !!(match && match.type === 'muted');
  }

}
