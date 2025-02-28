import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  PedalBoard,
  CreatePedalBoardRequest,
  EnvInterface,
} from '@guitar/interfaces';
import { PedalBoardStore } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class PedalBoardService {
  private apiUrl = `${this.env.api}/pedals/pedal-board`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface,
    private pedalBoardStore: PedalBoardStore
  ) {}

  // Get all pedalboards and store them
  getPedalBoards(): Observable<PedalBoard[]> {
    return this.http.get<PedalBoard[]>(`${this.apiUrl}s`).pipe(
      tap((pedalBoards) => this.pedalBoardStore.setPedalBoards(pedalBoards)) // Store the pedalboards
    );
  }

  // Create a new pedalboard and add it to the store
  createPedalBoard(
    pedalBoardData: CreatePedalBoardRequest
  ): Observable<PedalBoard> {
    return this.http.post<PedalBoard>(this.apiUrl, pedalBoardData).pipe(
      tap((pedalBoard) => this.pedalBoardStore.addPedalBoard(pedalBoard)) // Add to store
    );
  }

  // Update an existing pedalboard in the API and store
  updatePedalBoard(pedalBoard: PedalBoard): Observable<PedalBoard> {
    return this.http
      .put<PedalBoard>(`${this.apiUrl}/${pedalBoard._id}`, pedalBoard)
      .pipe(
        tap((updated) => this.pedalBoardStore.updatePedalBoard(updated)) // Update in store
      );
  }

  // Delete a pedalboard from the API and store
  deletePedalBoard(pedalBoardId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pedalBoardId}`).pipe(
      tap(() => this.pedalBoardStore.deletePedalBoard(pedalBoardId)) // Remove from store
    );
  }
}
