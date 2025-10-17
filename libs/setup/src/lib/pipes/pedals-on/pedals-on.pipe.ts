import { Pipe, PipeTransform } from '@angular/core';
import { PedalEntry } from '@guitar/interfaces';

@Pipe({
    name: 'pedalsOn',
    standalone: false
})
export class PedalsOnPipe implements PipeTransform {
  transform(value: PedalEntry[]): PedalEntry[] {
    if (!value) return [];
    return value.filter((v) => v.on);
  }
}
