import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'darkenColor',
    pure: true,
    standalone: false
})
export class DarkenColorPipe implements PipeTransform {
  transform(hex: string, amount: number = 20): string {
    if (!hex.startsWith('#')) return hex; // If it's not hex, return as-is

    let color = hex.substring(1); // Remove #
    let num = parseInt(color, 16);

    let r = (num >> 16) - amount;
    let g = ((num >> 8) & 0x00ff) - amount;
    let b = (num & 0x0000ff) - amount;

    r = r < 0 ? 0 : r;
    g = g < 0 ? 0 : g;
    b = b < 0 ? 0 : b;

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }
}
