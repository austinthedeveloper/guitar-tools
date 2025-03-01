import { Component } from '@angular/core';
import {
  AmpService,
  AmpStore,
  AmpUsageService,
  AmpUsageStore,
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

  pairings$ = this.pairingStore.pairings$;
  amps$ = this.ampStore.amps$;
  pedals$ = this.pedalStore.pedals$;
  ampUsages$ = this.ampUsageStore.ampUsages$;
  pedalBoards$ = this.pedalBoardStore.pedalBoards$;

  constructor(
    private pedalService: PedalService,
    private ampService: AmpService,
    private ampUsageService: AmpUsageService,
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
    this.ampUsageService.getAmpUsages().subscribe();
    this.pedalBoardService.getPedalBoards().subscribe();
  }
}
