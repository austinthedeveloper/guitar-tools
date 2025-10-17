import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Amp, Pedal, PedalBoard } from '@guitar/interfaces';
import {
  AmpService,
  AmpStore,
  PairingService,
  PairingStore,
  PedalBoardService,
  PedalBoardStore,
  PedalService,
  PedalStore,
  SetupModalService,
} from '@guitar/setup';

@Component({
    selector: 'guitar-setup-dashboard',
    templateUrl: './setup-dashboard.component.html',
    styleUrl: './setup-dashboard.component.scss',
    standalone: false
})
export class SetupDashboardComponent {
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
    private pairingStore: PairingStore,
    private modalService: SetupModalService,
    private router: Router
  ) {}

  deletePairing(id: string) {
    this.pairingService.delete(id).subscribe();
  }
  deleteAmp(id: string) {
    this.ampService.delete(id).subscribe();
  }
  deletePedal(id: string) {
    this.pedalService.delete(id).subscribe();
  }
  deletePedalboard(id: string) {
    this.pedalBoardService.delete(id).subscribe();
  }

  onPairingNavigate(id: string) {
    this.router.navigate(['/setup', 'pairing', id]);
  }

  openAmpModal(amp?: Amp) {
    this.modalService.openAmpModal(amp);
  }
  openPedalModal(pedal?: Pedal) {
    this.modalService.openPedalModal(pedal);
  }
  openPedalboardModal(pedalboard?: PedalBoard) {
    this.modalService.openPedalboardModal(pedalboard, this.pedals$);
  }

  onMenuClick(action: { type: string; id: string; pedal?: Pedal }) {
    switch (action.type) {
      case 'remove':
        this.pedalService.delete(action.id).subscribe();
        break;
      case 'edit':
        this.openPedalModal(action.pedal);
        break;
    }
  }
}
