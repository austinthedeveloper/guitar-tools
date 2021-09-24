import { Pipe, PipeTransform } from '@angular/core';
import { PressInterface, TuningChart } from '@guitar/interfaces';

@Pipe({
  name: 'activePresses'
})
export class ActivePressesPipe implements PipeTransform {

  transform(presses: PressInterface[] = [], tuningChart: TuningChart[] = []): string[] {
    const stringCount = tuningChart.length;
    return presses.reduce((prev, curr: PressInterface) => {
      const activeString = Math.abs(+curr.string - stringCount);
      return [...prev, tuningChart[activeString].scale[+curr.fret]];
    }, [] as string[]);
  }

}
