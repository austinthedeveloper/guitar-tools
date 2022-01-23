import { Injectable } from '@angular/core';
import { findKey } from 'lodash-es';
import { BehaviorSubject, Subject } from 'rxjs';
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
  inputs$ = this.sub.asObservable();

  config = {
    snare: 38,
    tap: 40,
    tom1: 48,
    tom2: 45,
    tom3: 43,
    hiHat: 46,
    ride: 51,
    crash1: 49,
  };

  constructor() {
    this.sub.next(MOCK_PRESS_DATA);
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
}
