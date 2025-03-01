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
import { Pairing } from '@guitar/interfaces';

@Injectable({ providedIn: 'root' })
export class PairingStore {
  private store = createStore(
    { name: 'pairings' },
    withEntities<Pairing, '_id'>({ idKey: '_id' }) // 👈 Use `_id`
  );

  // Selectors
  pairings$ = this.store.pipe(selectAllEntities());

  // Load all Pairings
  setPairings(pairings: Pairing[]) {
    this.store.update(setEntities(pairings));
  }

  // Add a Pairing
  addPairing(pairing: Pairing) {
    this.store.update(addEntities(pairing));
  }

  // Update a Pairing
  updatePairing(pairing: Pairing) {
    this.store.update(updateEntities(pairing._id, pairing)); // 👈 Use `_id`
  }

  // Delete a Pairing
  deletePairing(pairingId: string) {
    this.store.update(deleteEntities(pairingId));
  }
}
