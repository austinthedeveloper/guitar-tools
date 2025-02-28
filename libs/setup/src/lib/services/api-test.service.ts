import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvInterface } from '@guitar/interfaces';

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
  createAmp(ampData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/amps`, ampData);
  }

  /** ✅ Get all amps */
  getAmps(): Observable<any> {
    return this.http.get(`${this.apiUrl}/amps`);
  }

  /** ✅ Save an amp configuration */
  saveAmpUsage(ampUsage: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/amps/use`, ampUsage);
  }

  /** ✅ Create a pedal */
  createPedal(pedalData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedals`, pedalData);
  }

  /** ✅ Get all pedals */
  getPedals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedals`);
  }

  /** ✅ Create a pedalboard */
  createPedalBoard(pedalBoardData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedals/pedal-board`, pedalBoardData);
  }

  /** ✅ Get all pedalboards */
  getPedalBoards(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedals/pedal-boards`);
  }

  /** ✅ Pair an amp with a pedalboard (Future Feature) */
  pairAmpWithPedalBoard(pairingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pairings`, pairingData);
  }
}
