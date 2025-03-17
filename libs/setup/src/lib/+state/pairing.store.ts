import { Injectable } from '@angular/core';
import { Pairing } from '@guitar/interfaces';

import { BaseStore } from './base.store';

@Injectable({ providedIn: 'root' })
export class PairingStore extends BaseStore<Pairing> {
  constructor() {
    super('amps');
  }
}
