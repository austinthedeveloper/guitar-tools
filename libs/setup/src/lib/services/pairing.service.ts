import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  Pairing,
  CreatePairingRequest,
  EnvInterface,
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
      tap((pairings) => this.pairingStore.setPairings(pairings)) // Store in Elf
    );
  }

  // Create a new pairing and add it to the store
  pairAmpWithPedalBoard(
    pairingData: CreatePairingRequest
  ): Observable<Pairing> {
    return this.http.post<Pairing>(this.apiUrl, pairingData).pipe(
      tap((pairing) => this.pairingStore.addPairing(pairing)) // Add to store
    );
  }

  // Update an existing pairing in the API and store
  updatePairing(pairing: Pairing): Observable<Pairing> {
    return this.http
      .put<Pairing>(`${this.apiUrl}/${pairing._id}`, pairing)
      .pipe(
        tap((updated) => this.pairingStore.updatePairing(updated)) // Update in store
      );
  }

  // Delete a pairing from the API and store
  deletePairing(pairingId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pairingId}`).pipe(
      tap(() => this.pairingStore.deletePairing(pairingId)) // Remove from store
    );
  }
}
