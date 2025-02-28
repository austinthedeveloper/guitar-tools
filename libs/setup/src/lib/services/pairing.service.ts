import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Pairing,
  CreatePairingRequest,
  EnvInterface,
} from '@guitar/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PairingService {
  private apiUrl = `${this.env.api}/pairings`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface
  ) {}

  pairAmpWithPedalBoard(
    pairingData: CreatePairingRequest
  ): Observable<Pairing> {
    return this.http.post<Pairing>(`${this.apiUrl}`, pairingData);
  }

  getPairings(): Observable<Pairing[]> {
    return this.http.get<Pairing[]>(`${this.apiUrl}`);
  }
}
