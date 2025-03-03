import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  Amp,
  CreateAmpRequest,
  SaveAmpUsageRequest,
  AmpUsage,
  EnvInterface,
} from '@guitar/interfaces';
import { AmpStore, AmpUsageStore } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class AmpService {
  private apiUrl = `${this.env.api}/amps`;
  private apiUsageUrl = `${this.env.api}/amp-usage`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface,
    private ampStore: AmpStore,
    private ampUsageStore: AmpUsageStore
  ) {}
  getAmps(): Observable<Amp[]> {
    return this.http
      .get<Amp[]>(this.apiUrl)
      .pipe(tap((amps) => this.ampStore.setAmps(amps)));
  }

  createAmp(ampData: CreateAmpRequest): Observable<Amp> {
    return this.http
      .post<Amp>(this.apiUrl, ampData)
      .pipe(tap((amp) => this.ampStore.addAmp(amp)));
  }

  updateAmp(amp: Amp): Observable<Amp> {
    return this.http
      .put<Amp>(`${this.apiUrl}/${amp._id}`, amp)
      .pipe(tap((updated) => this.ampStore.updateAmp(updated)));
  }

  deleteAmp(ampId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${ampId}`)
      .pipe(tap(() => this.ampStore.deleteAmp(ampId)));
  }
}
