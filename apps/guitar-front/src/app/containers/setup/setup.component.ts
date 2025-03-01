import { Component } from '@angular/core';
import { Pairing, Amp, Pedal, AmpUsage } from '@guitar/interfaces';
import {
  AmpService,
  PairingService,
  PedalBoardService,
  PedalService,
  PedalStore,
  AmpStore,
  PedalBoardStore,
  PairingStore,
  AmpUsageStore,
} from '@guitar/setup';

@Component({
  selector: 'guitar-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent {
  pairings$ = this.pairingStore.pairings$;
  amps$ = this.ampStore.amps$;
  pedals$ = this.pedalStore.pedals$;
  ampUsages$ = this.ampUsageStore.ampUsages$;
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
    private ampUsageStore: AmpUsageStore
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.pairingService.getPairings().subscribe();
    this.ampService.getAmps().subscribe();
    this.pedalService.getPedals().subscribe();
    this.ampService.getAmpUsages().subscribe();
    this.pedalBoardService.getPedalBoards().subscribe();
  }

  createAmp() {
    // Navigate to Create Amp Page (Router Logic Placeholder)
  }

  createPedal() {
    // Navigate to Create Pedal Page (Router Logic Placeholder)
  }

  createPedalBoard() {
    // Navigate to Create Pedal Board Page (Router Logic Placeholder)
  }
}
