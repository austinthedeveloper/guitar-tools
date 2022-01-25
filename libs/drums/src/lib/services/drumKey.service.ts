import { Injectable } from '@angular/core';
import { findKey, groupBy, maxBy } from 'lodash-es';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DrumKeyClass } from '../classes/';
import { DrumKeyPress, DrumType } from '../interfaces';
import { MOCK_PRESS_DATA } from '../mocks';

@Injectable({
  providedIn: 'root',
})
export class DrumKeyService {
  private activeSub: Subject<DrumKeyPress> = new Subject();
  activeInput$ = this.activeSub.asObservable();
  private sub: BehaviorSubject<DrumKeyPress[]> = new BehaviorSubject(
    [] as DrumKeyPress[]
  );
  inputs$ = this.sub.asObservable().pipe(
    map((inputs) => {
      if (!inputs.length) return [];
      const baseTime = inputs[0].timestamp;
      return inputs.map((input) => {
        return {
          ...input,
          timestamp: input.timestamp - baseTime,
          row: this.getRow(input.type),
        };
      });
    })
  );

  inputRows$: Observable<DrumKeyPress[][]> = this.inputs$.pipe(
    filter((inputs) => !!inputs.length),
    map((inputs) => {
      const max: number = maxBy(inputs, 'timestamp').timestamp || 10000;
      const rows = Math.ceil(max / 10000);
      const res = [];
      for (let i = 0; i < rows; i++) {
        const match = inputs.filter(
          (input) =>
            i * 10000 <= input.timestamp && (i + 1) * 10000 > input.timestamp
        );

        res.push(
          match.map((asdf) => {
            return {
              ...asdf,
              timePercent: (asdf.timestamp / (10000 * (i + 1))) * 100,
            };
          })
        );
      }
      return res;
    })
  );

  config = {
    snare: 38,
    tap: 40,
    tom1: 48,
    tom2: 45,
    tom3: 43,
    hiHat: 46,
    hiHatClosed: 42,
    hiHatPedal: 23,
    ride: 51,
    crash1: 49,
    kick: 36,
  };

  constructor() {
    const test = MOCK_PRESS_DATA.map((data) => {
      if (data.key == 42) {
        data.type = 'hiHatClosed';
      }
      return data;
    });
    console.log('test', test);

    this.sub.next(test);
  }

  addInput(keyPress: DrumKeyPress) {
    const builtClass = new DrumKeyClass(
      keyPress.key,
      keyPress.hardness,
      keyPress.timestamp,
      findKey(
        this.config,
        (configKey) => keyPress.key === configKey
      ) as DrumType
    );

    this.activeSub.next(builtClass);
    this.sub.next([...this.sub.value, builtClass]);
  }

  private getRow(type: DrumType) {
    switch (type) {
      case 'snare':
        return 2;
      case 'tom1':
        return 1;
      case 'tom2':
        return 2;
      case 'tom3':
        return 3;
      case 'hiHat':
      case 'ride':
      case 'crash1':
      case 'crash2':
      case 'crash3':
        return 0;
      case 'kick':
        return 4;
      default:
        return 0;
    }
  }
}
