import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Amp,
  CreateAmpRequest,
  SaveAmpUsageRequest,
  AmpUsage,
  EnvInterface,
} from '@guitar/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AmpService {
  private apiUrl = `${this.env.api}/amps`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface
  ) {}

  createAmp(ampData: CreateAmpRequest): Observable<Amp> {
    return this.http.post<Amp>(`${this.apiUrl}`, ampData);
  }

  getAmps(): Observable<Amp[]> {
    return this.http.get<Amp[]>(`${this.apiUrl}`);
  }

  getAmpUsages(): Observable<AmpUsage[]> {
    return this.http.get<AmpUsage[]>(`${this.apiUrl}/use`);
  }

  saveAmpUsage(ampUsage: SaveAmpUsageRequest): Observable<AmpUsage> {
    return this.http.post<AmpUsage>(`${this.apiUrl}/use`, ampUsage);
  }
}
