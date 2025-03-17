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
import { PedalBoard } from '@guitar/interfaces';
import { BaseStore } from './base.store';

@Injectable({ providedIn: 'root' })
export class PedalBoardStore extends BaseStore<PedalBoard> {
  constructor() {
    super('pedalboards');
  }
}

// @Injectable({ providedIn: 'root' })
// export class PedalBoardStore {
//   private store = createStore(
//     { name: 'pedalboards' },
//     withEntities<PedalBoard, '_id'>({ idKey: '_id' }) // 👈 Use `_id`
//   );

//   // Selectors
//   pedalBoards$ = this.store.pipe(selectAllEntities());
//   getOne(id: string) {
//     return this.store.pipe(selectEntity(id));
//   }

//   // Load all PedalBoards
//   setPedalBoards(pedalBoards: PedalBoard[]) {
//     this.store.update(setEntities(pedalBoards));
//   }

//   // Add a PedalBoard
//   addPedalBoard(pedalBoard: PedalBoard) {
//     this.store.update(addEntities(pedalBoard));
//   }

//   // Update a PedalBoard
//   updatePedalBoard(pedalBoard: PedalBoard) {
//     this.store.update(updateEntities(pedalBoard._id, pedalBoard)); // 👈 Use `_id`
//   }

//   // Delete a PedalBoard
//   deletePedalBoard(pedalBoardId: string) {
//     this.store.update(deleteEntities(pedalBoardId));
//   }
// }
