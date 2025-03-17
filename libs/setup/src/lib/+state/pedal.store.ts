import { Injectable } from '@angular/core';
import { Pedal } from '@guitar/interfaces';

import { BaseStore } from './base.store';

@Injectable({ providedIn: 'root' })
export class PedalStore extends BaseStore<Pedal> {
  constructor() {
    super('pedals');
  }
}
