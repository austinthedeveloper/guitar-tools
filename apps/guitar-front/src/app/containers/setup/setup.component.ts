import { Component } from '@angular/core';
import { Pairing, Amp, Pedal, AmpUsage } from '@guitar/interfaces';
import {
  AmpService,
  PairingService,
  PedalBoardService,
  PedalService,
} from '@guitar/setup';

@Component({
  selector: 'guitar-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent {
  pairings: Pairing[] = [];
  amps: Amp[] = [];
  pedals: Pedal[] = [];
  ampUsages: AmpUsage[] = [];

  constructor(
    private pedalService: PedalService,
    private ampService: AmpService,
    private pairingService: PairingService,
    private pedalBoardService: PedalBoardService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.pairingService
      .getPairings()
      .subscribe((data) => (this.pairings = data));
    this.ampService.getAmps().subscribe((data) => (this.amps = data));
    this.pedalService.getPedals().subscribe((data) => (this.pedals = data));
    this.ampService.getAmpUsages().subscribe((data) => (this.ampUsages = data));
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
