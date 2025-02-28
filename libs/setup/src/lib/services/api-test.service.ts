import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Amp,
  CreateAmpRequest,
  SaveAmpUsageRequest,
  Pedal,
  CreatePedalRequest,
  PedalBoard,
  CreatePedalBoardRequest,
  Pairing,
  CreatePairingRequest,
  EnvInterface,
  AmpUsage,
} from '@guitar/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiTestService {
  private apiUrl = `${this.env.api}`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface
  ) {}

  /** ✅ Create an amp */
  createAmp(ampData: CreateAmpRequest): Observable<Amp> {
    return this.http.post<Amp>(`${this.apiUrl}/amps`, ampData);
  }

  /** ✅ Get all amps */
  getAmps(): Observable<Amp[]> {
    return this.http.get<Amp[]>(`${this.apiUrl}/amps`);
  }

  getAmpUsages(): Observable<AmpUsage[]> {
    return this.http.get<AmpUsage[]>(`${this.apiUrl}/amps/use`);
  }

  /** ✅ Save an amp configuration */
  saveAmpUsage(ampUsage: SaveAmpUsageRequest): Observable<AmpUsage> {
    return this.http.post<AmpUsage>(`${this.apiUrl}/amps/use`, ampUsage);
  }

  /** ✅ Create a pedal */
  createPedal(pedalData: CreatePedalRequest): Observable<Pedal> {
    return this.http.post<Pedal>(`${this.apiUrl}/pedals`, pedalData);
  }

  /** ✅ Get all pedals */
  getPedals(): Observable<Pedal[]> {
    return this.http.get<Pedal[]>(`${this.apiUrl}/pedals`);
  }

  /** ✅ Create a pedalboard */
  createPedalBoard(
    pedalBoardData: CreatePedalBoardRequest
  ): Observable<PedalBoard> {
    return this.http.post<PedalBoard>(
      `${this.apiUrl}/pedals/pedal-board`,
      pedalBoardData
    );
  }

  /** ✅ Get all pedalboards */
  getPedalBoards(): Observable<PedalBoard[]> {
    return this.http.get<PedalBoard[]>(`${this.apiUrl}/pedals/pedal-boards`);
  }

  /** ✅ Pair an amp with a pedalboard */
  pairAmpWithPedalBoard(
    pairingData: CreatePairingRequest
  ): Observable<Pairing> {
    return this.http.post<Pairing>(`${this.apiUrl}/pairings`, pairingData);
  }

  getPairings(): Observable<Pairing[]> {
    return this.http.get<Pairing[]>(`${this.apiUrl}/pairings`);
  }
}
