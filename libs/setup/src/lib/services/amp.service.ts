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
  // Usage
  // Get all Amp Usages and store them
  getAmpUsages(): Observable<AmpUsage[]> {
    return this.http.get<AmpUsage[]>(`${this.apiUrl}/use`).pipe(
      tap((ampUsages) => this.ampUsageStore.setAmpUsages(ampUsages)) // Store in Elf
    );
  }

  // Create a new Amp Usage and add it to the store
  saveAmpUsage(ampUsageData: SaveAmpUsageRequest): Observable<AmpUsage> {
    return this.http.post<AmpUsage>(`${this.apiUrl}/use`, ampUsageData).pipe(
      tap((ampUsage) => this.ampUsageStore.addAmpUsage(ampUsage)) // Add to store
    );
  }

  // Update an existing Amp Usage in the API and store
  updateAmpUsage(ampUsage: AmpUsage): Observable<AmpUsage> {
    return this.http
      .put<AmpUsage>(`${this.apiUrl}/use/${ampUsage._id}`, ampUsage)
      .pipe(
        tap((updated) => this.ampUsageStore.updateAmpUsage(updated)) // Update in store
      );
  }

  // Delete an Amp Usage from the API and store
  deleteAmpUsage(ampUsageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/use/${ampUsageId}`).pipe(
      tap(() => this.ampUsageStore.deleteAmpUsage(ampUsageId)) // Remove from store
    );
  }
}
