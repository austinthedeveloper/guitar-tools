import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DrumKeyClass } from '../classes/';
import { DrumKeyPress } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DrumKeyService {
  private sub: BehaviorSubject<DrumKeyPress[]> = new BehaviorSubject(
    [] as DrumKeyPress[]
  );
  inputs$ = this.sub.asObservable();

  constructor() {}

  addInput(keyPress: DrumKeyPress) {
    const builtClass = new DrumKeyClass(
      keyPress.key,
      keyPress.hardness,
      keyPress.timestamp
    );
    this.sub.next([...this.sub.value, builtClass]);
  }
}
