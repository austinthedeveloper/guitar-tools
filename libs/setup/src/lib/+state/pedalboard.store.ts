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
import { PedalBoard } from '@guitar/interfaces';

@Injectable({ providedIn: 'root' })
export class PedalBoardStore {
  private store = createStore(
    { name: 'pedalboards' },
    withEntities<PedalBoard, '_id'>({ idKey: '_id' }) // 👈 Use `_id`
  );

  // Selectors
  pedalBoards$ = this.store.pipe(selectAllEntities());

  // Load all PedalBoards
  setPedalBoards(pedalBoards: PedalBoard[]) {
    this.store.update(setEntities(pedalBoards));
  }

  // Add a PedalBoard
  addPedalBoard(pedalBoard: PedalBoard) {
    this.store.update(addEntities(pedalBoard));
  }

  // Update a PedalBoard
  updatePedalBoard(pedalBoard: PedalBoard) {
    this.store.update(updateEntities(pedalBoard._id, pedalBoard)); // 👈 Use `_id`
  }

  // Delete a PedalBoard
  deletePedalBoard(pedalBoardId: string) {
    this.store.update(deleteEntities(pedalBoardId));
  }
}
