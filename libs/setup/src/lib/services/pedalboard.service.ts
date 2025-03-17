import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  PedalBoard,
  CreatePedalBoardRequest,
  EnvInterface,
  AiPedalSettings,
} from '@guitar/interfaces';
import { PedalBoardStore } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class PedalBoardService {
  private apiUrl = `${this.env.api}/pedal-boards`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface,
    private pedalBoardStore: PedalBoardStore
  ) {}

  // Get all pedalboards and store them
  getPedalBoards(): Observable<PedalBoard[]> {
    return this.http.get<PedalBoard[]>(`${this.apiUrl}`).pipe(
      tap((pedalBoards) => this.pedalBoardStore.setMany(pedalBoards)) // Store the pedalboards
    );
  }

  // Create a new pedalboard and add it to the store
  createPedalBoard(
    pedalBoardData: CreatePedalBoardRequest
  ): Observable<PedalBoard> {
    return this.http.post<PedalBoard>(this.apiUrl, pedalBoardData).pipe(
      tap((pedalBoard) => this.pedalBoardStore.addOne(pedalBoard)) // Add to store
    );
  }

  // Update an existing pedalboard in the API and store
  updatePedalBoard(id: string, pedalBoard: PedalBoard): Observable<PedalBoard> {
    return this.http.put<PedalBoard>(`${this.apiUrl}/${id}`, pedalBoard).pipe(
      tap((updated) => this.pedalBoardStore.updateOne(updated)) // Update in store
    );
  }

  // Delete a pedalboard from the API and store
  deletePedalBoard(pedalBoardId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pedalBoardId}`).pipe(
      tap(() => this.pedalBoardStore.deleteOne(pedalBoardId)) // Remove from store
    );
  }
  addToPedalboard(
    pedalboardId: string,
    pedal: AiPedalSettings
  ): Observable<PedalBoard> {
    return this.http
      .post<PedalBoard>(`${this.apiUrl}/${pedalboardId}/add-pedal`, pedal)
      .pipe(
        tap((updated) => this.pedalBoardStore.updateOne(updated)) // Update in store
      );
  }
  removeFromPedalboard(
    pedalboardId: string,
    pedalId: string
  ): Observable<PedalBoard> {
    return this.http
      .post<PedalBoard>(`${this.apiUrl}/${pedalboardId}/remove-pedal`, {
        pedalId,
      })
      .pipe(
        tap((updated) => this.pedalBoardStore.updateOne(updated)) // Update in store
      );
  }
}
