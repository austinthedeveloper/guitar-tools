import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Pedal, CreatePedalRequest, EnvInterface } from '@guitar/interfaces';
import { PedalStore } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class PedalService {
  private apiUrl = `${this.env.api}/pedals`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface,
    private pedalStore: PedalStore
  ) {}

  getPedals(): Observable<Pedal[]> {
    return this.http.get<Pedal[]>(this.apiUrl).pipe(
      tap((pedals) => this.pedalStore.setMany(pedals)) // Store the pedals
    );
  }

  // Create a new pedal and add it to the store
  createPedal(pedalData: CreatePedalRequest): Observable<Pedal> {
    return this.http.post<Pedal>(this.apiUrl, pedalData).pipe(
      tap((pedal) => this.pedalStore.addOne(pedal)) // Add to store
    );
  }

  // Update an existing pedal in the API and store
  updatePedal(id: string, pedal: Pedal): Observable<Pedal> {
    return this.http.put<Pedal>(`${this.apiUrl}/${id}`, pedal).pipe(
      tap((updated) => this.pedalStore.updateOne(updated)) // Update in store
    );
  }

  // Delete a pedal from the API and store
  deletePedal(pedalId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pedalId}`).pipe(
      tap(() => this.pedalStore.deleteOne(pedalId)) // Remove from store
    );
  }
}
