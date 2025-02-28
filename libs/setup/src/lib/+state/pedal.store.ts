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
import { Pedal } from '@guitar/interfaces';

@Injectable({ providedIn: 'root' })
export class PedalStore {
  private store = createStore(
    { name: 'pedals' },
    withEntities<Pedal, '_id'>({ idKey: '_id' }) // 👈 Use `_id`
  );

  // Selectors
  pedals$ = this.store.pipe(selectAllEntities());

  // Load all Pedals
  setPedals(pedals: Pedal[]) {
    this.store.update(setEntities(pedals));
  }

  // Add a Pedal
  addPedal(pedal: Pedal) {
    this.store.update(addEntities(pedal));
  }

  // Update a Pedal
  updatePedal(pedal: Pedal) {
    this.store.update(updateEntities(pedal._id, pedal)); // 👈 Use `_id`
  }

  // Delete a Pedal
  deletePedal(pedalId: string) {
    this.store.update(deleteEntities(pedalId));
  }
}
