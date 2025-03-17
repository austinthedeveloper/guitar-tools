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
import { BaseService } from './base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class PedalBoardService extends BaseService<
  PedalBoard,
  CreatePedalBoardRequest,
  PedalBoard
> {
  constructor(
    http: HttpClient,
    @Inject('environment') env: EnvInterface,
    private pedalBoardStore: PedalBoardStore
  ) {
    super(http, env, pedalBoardStore, 'pedal-boards');
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
