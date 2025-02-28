import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
} from '@ngneat/elf-entities';
import { AmpUsage } from '@guitar/interfaces';

@Injectable({ providedIn: 'root' })
export class AmpUsageStore {
  private store = createStore(
    { name: 'ampUsages' },
    withEntities<AmpUsage, '_id'>({ idKey: '_id' }) // 👈 Use `_id`
  );

  // Selectors
  ampUsages$ = this.store.pipe(selectAllEntities());

  // Load all Amp Usages
  setAmpUsages(ampUsages: AmpUsage[]) {
    this.store.update(setEntities(ampUsages));
  }

  // Add an Amp Usage
  addAmpUsage(ampUsage: AmpUsage) {
    this.store.update(addEntities(ampUsage));
  }

  // Update an Amp Usage
  updateAmpUsage(ampUsage: AmpUsage) {
    this.store.update(updateEntities(ampUsage._id, ampUsage)); // 👈 Use `_id`
  }

  // Delete an Amp Usage
  deleteAmpUsage(ampUsageId: string) {
    this.store.update(deleteEntities(ampUsageId));
  }
}
