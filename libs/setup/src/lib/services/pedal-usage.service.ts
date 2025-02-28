import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvInterface } from '@guitar/interfaces';
import { PedalUsage } from './../../../../../apps/guitar-api/src/app/schemas/pedal-usage.schema';

@Injectable({
  providedIn: 'root',
})
export class PedalUsageService {
  private apiUrl = `${this.env.api}/pedal-usage`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface
  ) {}

  getPedalUsage(): Observable<PedalUsage[]> {
    return this.http.get<PedalUsage[]>(`${this.apiUrl}`);
  }

  createPedalUsage(pedalUsageData: any): Observable<PedalUsage> {
    return this.http.post<PedalUsage>(`${this.apiUrl}`, pedalUsageData);
  }
}
