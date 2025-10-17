import { Pipe, PipeTransform } from '@angular/core';
import { PressInterface, TuningChart } from '@guitar/interfaces';
import { maxBy } from 'lodash-es';

@Pipe({
    name: 'activePresses',
    standalone: false
})
export class ActivePressesPipe implements PipeTransform {

  transform(presses: PressInterface[] = [], tuningChart: TuningChart[] = [], removeDuplicate = true): string[] {
    const stringCount = tuningChart.length;

    const arr = removeDuplicate ? this.removeDuplicates(presses) : presses;
    return arr.reduce((prev, curr: PressInterface) => {
      const activeString = Math.abs(+curr.string - stringCount);
      return [...prev, tuningChart[activeString].scale[+curr.fret]];
    }, [] as string[]);
  }

  private removeDuplicates(presses: PressInterface[]): PressInterface[] {
    return presses.filter(press => {
      const duplicates = this.stringDuplicate(press.string, presses);
      const maxFret: PressInterface = maxBy(duplicates, (p => +p.fret)) as PressInterface;
      return +maxFret?.fret === +press.fret;
    })
  }
  private stringDuplicate(string: string, presses: PressInterface[]): PressInterface[] {
    return presses.filter(press =>press.string === string)
  }


}
