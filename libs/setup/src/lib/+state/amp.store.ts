import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
  selectEntity,
} from '@ngneat/elf-entities';
import { Amp } from '@guitar/interfaces';

@Injectable({ providedIn: 'root' })
export class AmpStore {
  private store = createStore(
    { name: 'amps' },
    withEntities<Amp, '_id'>({ idKey: '_id' })
  );

  // Selectors
  amps$ = this.store.pipe(selectAllEntities());

  getOne(id: string) {
    return this.store.pipe(selectEntity(id));
  }
  // Load all Amps
  setAmps(amps: Amp[]) {
    this.store.update(setEntities(amps));
  }

  // Add an Amp
  addAmp(amp: Amp) {
    this.store.update(addEntities(amp));
  }

  // Update an Amp
  updateAmp(amp: Amp) {
    this.store.update(updateEntities(amp._id, amp));
  }

  // Delete an Amp
  deleteAmp(ampId: string) {
    this.store.update(deleteEntities(ampId));
  }
}
