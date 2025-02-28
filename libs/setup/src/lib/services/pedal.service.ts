import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedal, CreatePedalRequest, EnvInterface } from '@guitar/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PedalService {
  private apiUrl = `${this.env.api}/pedals`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface
  ) {}

  createPedal(pedalData: CreatePedalRequest): Observable<Pedal> {
    return this.http.post<Pedal>(`${this.apiUrl}`, pedalData);
  }

  getPedals(): Observable<Pedal[]> {
    return this.http.get<Pedal[]>(`${this.apiUrl}`);
  }
}
