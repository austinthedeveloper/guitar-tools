import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  PedalService,
  AmpService,
  PairingService,
  PedalBoardService,
  AmpStore,
  PedalStore,
  PedalBoardStore,
  PairingStore,
} from '@guitar/setup';

@Component({
  selector: 'guitar-setup-dashboard',
  templateUrl: './setup-dashboard.component.html',
  styleUrl: './setup-dashboard.component.scss',
})
export class SetupDashboardComponent {
  disabled!: boolean;

  pairings$ = this.pairingStore.pairings$;
  amps$ = this.ampStore.amps$;
  pedals$ = this.pedalStore.pedals$;
  pedalBoards$ = this.pedalBoardStore.pedalBoards$;

  constructor(
    private pedalService: PedalService,
    private ampService: AmpService,
    private pairingService: PairingService,
    private pedalBoardService: PedalBoardService,
    private ampStore: AmpStore,
    private pedalStore: PedalStore,
    private pedalBoardStore: PedalBoardStore,
    private pairingStore: PairingStore,
    private router: Router
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

  onPairingNavigate(id: string) {
    this.router.navigate(['/setup', 'pairing', id]);
  }
}
