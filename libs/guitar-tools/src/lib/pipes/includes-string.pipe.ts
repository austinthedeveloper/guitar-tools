import { Pipe, PipeTransform } from '@angular/core';
import { PressInterface } from '@guitar/interfaces';

@Pipe({
    name: 'includesString',
    standalone: false
})
export class IncludesStringPipe implements PipeTransform {
  transform(value: PressInterface[], fret: number, string: number): boolean {
    return !!value.find(
      (v) => v.fret === fret.toString() && v.string === string.toString()
    );
  }
}
