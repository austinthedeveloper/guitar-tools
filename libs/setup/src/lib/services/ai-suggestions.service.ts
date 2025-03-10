import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  AiSettingsResponse,
  AiSuggestionPayload,
  EnvInterface,
} from '@guitar/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiSuggestionsService {
  private apiUrl = `${this.env.api}/ai`;

  constructor(
    private http: HttpClient,
    @Inject('environment') private env: EnvInterface
  ) {}

  fetchSettings(data: AiSuggestionPayload) {
    return this.http.post<AiSettingsResponse>(
      `${this.apiUrl}/suggest-settings`,
      data
    );
  }
}
