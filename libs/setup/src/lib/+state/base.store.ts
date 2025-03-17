import { Injectable } from '@angular/core';
import { createStore, Store } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
  selectEntity,
  upsertEntities,
} from '@ngneat/elf-entities';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class BaseStore<T extends { _id: string }> {
  protected store: Store;

  constructor(storeName: string) {
    this.store = createStore(
      { name: storeName },
      withEntities<T, '_id'>({ idKey: '_id' })
    );
  }

  get items$(): Observable<T[]> {
    return this.store.pipe(selectAllEntities());
  }

  getOne$(id: string): Observable<T | undefined> {
    return this.store.pipe(selectEntity(id));
  }

  // CRUD Operations
  setMany(items: T[]): void {
    this.store.update(setEntities(items));
  }

  addOne(item: T): void {
    this.store.update(addEntities(item));
  }

  upsertOne(item: T): void {
    this.store.update(upsertEntities(item));
  }

  updateOne(item: T): void {
    this.store.update(updateEntities(item._id, item));
  }

  deleteOne(id: string): void {
    this.store.update(deleteEntities(id));
  }
}
