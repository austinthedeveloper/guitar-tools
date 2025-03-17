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

@Injectable({
  providedIn: 'root',
})
export class PairingService {
  private apiUrl = `${this.env.api}/pairings`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface,
    private pairingStore: PairingStore
  ) {}

  // Get all pairings and store them
  getPairings(): Observable<Pairing[]> {
    return this.http.get<Pairing[]>(this.apiUrl).pipe(
      tap((pairings) => this.pairingStore.setMany(pairings)) // Store in Elf
    );
  }
  getPairing(id: string): Observable<Pairing> {
    return this.http.get<Pairing>(`${this.apiUrl}/${id}`).pipe(
      tap((pairings) => this.pairingStore.upsertOne(pairings)) // Store in Elf
    );
  }

  createPairing(payload: PairingPayload) {
    return this.http.post<Pairing>(this.apiUrl, payload).pipe(
      tap((pairing) => this.pairingStore.addOne(pairing)) // Add to store
    );
  }

  // Create a new pairing and add it to the store
  pairAmpWithPedalBoard(
    pairingData: CreatePairingRequest
  ): Observable<Pairing> {
    return this.http.post<Pairing>(this.apiUrl, pairingData).pipe(
      tap((pairing) => this.pairingStore.addOne(pairing)) // Add to store
    );
  }

  // Update an existing pairing in the API and store
  updatePairing(id: string, pairing: PairingPayload): Observable<Pairing> {
    return this.http.put<Pairing>(`${this.apiUrl}/${id}`, pairing).pipe(
      tap((updated) => this.pairingStore.updateOne(updated)) // Update in store
    );
  }

  // Delete a pairing from the API and store
  deletePairing(pairingId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pairingId}`).pipe(
      tap(() => this.pairingStore.deleteOne(pairingId)) // Remove from store
    );
  }
}
