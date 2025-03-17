import { Injectable } from '@angular/core';
import { Amp } from '@guitar/interfaces';
import { BaseStore } from './base.store';

@Injectable({ providedIn: 'root' })
export class AmpStore extends BaseStore<Amp> {
  constructor() {
    super('amps');
  }
}
