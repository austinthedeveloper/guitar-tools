import { Component } from '@angular/core';
import { Pairing, Amp, Pedal, AmpUsage } from '@guitar/interfaces';
import { ApiTestService } from 'libs/setup/src/lib/services';

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

  constructor(private apiService: ApiTestService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.apiService.getPairings().subscribe((data) => (this.pairings = data));
    this.apiService.getAmps().subscribe((data) => (this.amps = data));
    this.apiService.getPedals().subscribe((data) => (this.pedals = data));
    this.apiService.getAmpUsages().subscribe((data) => (this.ampUsages = data));
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
