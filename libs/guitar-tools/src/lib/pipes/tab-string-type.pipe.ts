import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabStringType'
})
export class TabStringTypePipe implements PipeTransform {
  transform(value: any[], position: number, fret: number): any {
    const match = value.find(v => (v.fret === fret.toString() && v.order === position.toString()));
    if(match) {
      console.log('hit', position, fret, match, value);

    }
    return match;
  }

}
