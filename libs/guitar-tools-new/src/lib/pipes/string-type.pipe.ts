import { Pipe, PipeTransform } from '@angular/core';
import { PressInterface } from '@guitar/interfaces';

@Pipe({
  name: 'stringType',
})
export class StringTypePipe implements PipeTransform {
  transform(value: PressInterface[], fret: number, string: number): string {
    const match = value.find(
      (v) => v.fret === fret.toString() && v.string === string.toString()
    );
    return match ? match.type || 'pressed' : '';
  }
}
