import { Pipe, PipeTransform } from '@angular/core';
import {ChartTabNote} from '@guitar/interfaces'
@Pipe({
  name: 'tabStringType',
  standalone: true,
})
export class TabStringTypePipe implements PipeTransform {
  transform(value: ChartTabNote[], order: number, string: number): any {
    return value.find(v => (v.string === string.toString() && v.order === order.toString()));
  }

}
