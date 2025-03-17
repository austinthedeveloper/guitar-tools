import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Amp, CreateAmpRequest, EnvInterface } from '@guitar/interfaces';
import { Observable, tap } from 'rxjs';

import { AmpStore } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class AmpService {
  private apiUrl = `${this.env.api}/amps`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface,
    private ampStore: AmpStore
  ) {}
  getAmps(): Observable<Amp[]> {
    return this.http
      .get<Amp[]>(this.apiUrl)
      .pipe(tap((amps) => this.ampStore.setMany(amps)));
  }

  createAmp(ampData: CreateAmpRequest): Observable<Amp> {
    return this.http
      .post<Amp>(this.apiUrl, ampData)
      .pipe(tap((amp) => this.ampStore.addOne(amp)));
  }

  updateAmp(id: string, amp: Amp): Observable<Amp> {
    return this.http
      .put<Amp>(`${this.apiUrl}/${id}`, amp)
      .pipe(tap((updated) => this.ampStore.updateOne(updated)));
  }

  deleteAmp(ampId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${ampId}`)
      .pipe(tap(() => this.ampStore.deleteOne(ampId)));
  }
}
