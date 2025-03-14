import { Pipe, PipeTransform } from '@angular/core';
import { PEDAL_TYPE_COLOR_DEFAULT, PEDAL_TYPES } from '../../helpers';

@Pipe({
  name: 'pedalColor',
})
export class PedalColorPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return PEDAL_TYPE_COLOR_DEFAULT;
    return (
      PEDAL_TYPES.find((type) => type.name === value)?.color ||
      PEDAL_TYPE_COLOR_DEFAULT
    );
  }
}
