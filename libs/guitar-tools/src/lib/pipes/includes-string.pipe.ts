import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includesString'
})
export class IncludesStringPipe implements PipeTransform {

  transform(value: any[], fret: number, string: number): boolean {
    return !!value.find(v => (v.fret === fret.toString() && v.string === string.toString()));
  }

}
