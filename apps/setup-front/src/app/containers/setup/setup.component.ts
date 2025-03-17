import { Component } from '@angular/core';
import {
  AmpService,
  AmpStore,
  PairingService,
  PairingStore,
  PedalBoardService,
  PedalBoardStore,
  PedalService,
  PedalStore,
} from '@guitar/setup';

@Component({
  selector: 'guitar-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent {
  disabled!: boolean;

  pairings$ = this.pairingStore.items$;
  amps$ = this.ampStore.items$;
  pedals$ = this.pedalStore.items$;
  pedalBoards$ = this.pedalBoardStore.items$;

  constructor(
    private pedalService: PedalService,
    private ampService: AmpService,
    private pairingService: PairingService,
    private pedalBoardService: PedalBoardService,
    private ampStore: AmpStore,
    private pedalStore: PedalStore,
    private pedalBoardStore: PedalBoardStore,
    private pairingStore: PairingStore
  ) {}

  deletePairing(id: string) {
    this.pairingService.deletePairing(id).subscribe();
  }
  deleteAmp(id: string) {
    this.ampService.deleteAmp(id).subscribe();
  }
  deletePedal(id: string) {
    this.pedalService.deletePedal(id).subscribe();
  }
  deletePedalboard(id: string) {
    this.pedalBoardService.deletePedalBoard(id).subscribe();
  }
}
