import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberProper',
})
export class NumberProperPipe implements PipeTransform {
  transform(value: string | number): string {
    return `${value}${this.getTrail(+value)}`;
  }

  private getTrail(value: number): string {
    switch (+value) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
