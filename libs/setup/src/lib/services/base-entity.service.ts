import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseStore } from '../+state/base.store';
import { EnvInterface } from '@guitar/interfaces';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<
  T extends { _id: string },
  CreateDto,
  UpdateDto = CreateDto
> {
  protected apiUrl: string;

  constructor(
    protected http: HttpClient,
    protected env: EnvInterface,
    protected store: BaseStore<T>,
    endpoint: string
  ) {
    this.apiUrl = `${this.env.api}/${endpoint}`;
  }

  getAll(): Observable<T[]> {
    return this.http
      .get<T[]>(this.apiUrl)
      .pipe(tap((items) => this.store.setMany(items)));
  }

  getOne(id: string): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}/${id}`)
      .pipe(tap((item) => this.store.upsertOne(item)));
  }

  create(payload: CreateDto): Observable<T> {
    return this.http
      .post<T>(this.apiUrl, payload)
      .pipe(tap((item) => this.store.addOne(item)));
  }

  update(id: string, payload: UpdateDto): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}/${id}`, payload)
      .pipe(tap((updated) => this.store.updateOne(updated)));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.store.deleteOne(id)));
  }
}
