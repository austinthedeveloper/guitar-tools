import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PedalBoard,
  CreatePedalBoardRequest,
  EnvInterface,
} from '@guitar/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PedalBoardService {
  private apiUrl = `${this.env.api}/pedals/pedal-board`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface
  ) {}

  createPedalBoard(
    pedalBoardData: CreatePedalBoardRequest
  ): Observable<PedalBoard> {
    return this.http.post<PedalBoard>(`${this.apiUrl}`, pedalBoardData);
  }

  getPedalBoards(): Observable<PedalBoard[]> {
    return this.http.get<PedalBoard[]>(`${this.apiUrl}s`);
  }
}
