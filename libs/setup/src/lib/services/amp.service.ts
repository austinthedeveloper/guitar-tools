import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Amp, CreateAmpRequest, EnvInterface } from '@guitar/interfaces';

import { AmpStore } from '../+state';
import { BaseService } from './base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class AmpService extends BaseService<Amp, CreateAmpRequest, Amp> {
  constructor(
    http: HttpClient,
    @Inject('environment') env: EnvInterface,
    ampStore: AmpStore
  ) {
    super(http, env, ampStore, 'amps');
  }
}
