import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  Pairing,
  CreatePairingRequest,
  EnvInterface,
  PairingPayload,
} from '@guitar/interfaces';
import { PairingStore } from '../+state';
import { BaseService } from './base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class PairingService extends BaseService<Pairing, PairingPayload> {
  constructor(
    http: HttpClient,
    @Inject('environment') env: EnvInterface,
    pairingStore: PairingStore
  ) {
    super(http, env, pairingStore, 'pairings');
  }

  // Create a new pairing and add it to the store
  pairAmpWithPedalBoard(
    pairingData: CreatePairingRequest
  ): Observable<Pairing> {
    return this.http.post<Pairing>(this.apiUrl, pairingData).pipe(
      tap((pairing) => this.store.addOne(pairing)) // Add to store
    );
  }
}
