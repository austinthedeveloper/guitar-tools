import { Pipe, PipeTransform } from '@angular/core';
import { PEDAL_TYPES } from '../../helpers';

@Pipe({
  name: 'pedalColor',
})
export class PedalColorPipe implements PipeTransform {
  transform(value: string): string {
    return PEDAL_TYPES.find((type) => type.name === value).color;
  }
}
