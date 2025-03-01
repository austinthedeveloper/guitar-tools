import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvInterface } from '@guitar/interfaces';

// TODO: This service might not be needed
@Injectable({
  providedIn: 'root',
})
export class PedalUsageService {
  private apiUrl = `${this.env.api}/pedals/pedal-usage`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface
  ) {}

  getPedalUsage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  createPedalUsage(pedalUsageData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, pedalUsageData);
  }
}
