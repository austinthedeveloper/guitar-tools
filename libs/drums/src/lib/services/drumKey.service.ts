import { Injectable } from '@angular/core';
import { findKey, groupBy, maxBy } from 'lodash-es';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
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
  private userOptions = new BehaviorSubject({
    timelines: 10000,
  });
  userOptions$ = this.userOptions.asObservable();
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

  inputRows$: Observable<DrumKeyPress[][]> = combineLatest(
    this.inputs$,
    this.userOptions
  ).pipe(
    filter(([inputs]) => !!inputs.length),
    map(([inputs, { timelines }]) => {
      const max: number = maxBy(inputs, 'timestamp').timestamp || timelines;
      const rows = Math.ceil(max / timelines);
      const res = [];
      for (let i = 0; i < rows; i++) {
        const match = inputs.filter(
          (input) =>
            i * timelines <= input.timestamp &&
            (i + 1) * timelines > input.timestamp
        );

        res.push(
          match.map((asdf) => {
            return {
              ...asdf,
              timePercent: (asdf.timestamp / (timelines * (i + 1))) * 100,
            };
          })
        );
      }
      return res;
    })
  );

  private configSub = new BehaviorSubject({
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
  });
  config$ = this.configSub.asObservable();

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
        this.configSub.value,
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
      case 'hiHatPedal':
        return 5;
      default:
        return 0;
    }
  }
}
