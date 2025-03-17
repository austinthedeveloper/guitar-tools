import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreatePedalRequest, EnvInterface, Pedal } from '@guitar/interfaces';

import { PedalStore } from '../+state';
import { BaseService } from './base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class PedalService extends BaseService<
  Pedal,
  CreatePedalRequest,
  Pedal
> {
  constructor(
    http: HttpClient,
    @Inject('environment') env: EnvInterface,
    pedalStore: PedalStore
  ) {
    super(http, env, pedalStore, 'pedals');
  }
}
