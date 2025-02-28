import { Component } from '@angular/core';
import {
  Amp,
  CreateAmpRequest,
  SaveAmpUsageRequest,
  Pedal,
  CreatePedalRequest,
  PedalBoard,
  CreatePedalBoardRequest,
  CreatePairingRequest,
} from '@guitar/interfaces';
import { ApiTestService } from '../services';

@Component({
  selector: 'lib-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss'],
})
export class ApiTestComponent {
  amps: Amp[] = [];
  pedals: Pedal[] = [];
  pedalBoards: PedalBoard[] = [];
  selectedAmp?: Amp;
  selectedPedalBoard?: PedalBoard;

  constructor(private apiTestService: ApiTestService) {}

  /** ✅ 1st Pass: Create an amp */
  createAmp() {
    const ampData: CreateAmpRequest = {
      name: 'Fender Deville',
      inputs: ['Input 1'],
      knobs: ['Treble', 'Middle', 'Bass'],
    };
    this.apiTestService.createAmp(ampData).subscribe((amp) => {
      console.log('Created Amp:', amp);
      this.fetchAmps();
    });
  }

  /** ✅ Get all amps */
  fetchAmps() {
    this.apiTestService.getAmps().subscribe((amps) => {
      this.amps = amps;
      console.log('All Amps:', this.amps);
    });
  }

  /** ✅ Save amp usage */
  saveAmpUsage() {
    if (!this.selectedAmp) return;
    const ampUsage: SaveAmpUsageRequest = {
      ampId: this.selectedAmp._id,
      knobValues: { Treble: 6, Middle: 5, Bass: 7 },
    };
    this.apiTestService
      .saveAmpUsage(ampUsage)
      .subscribe((res) => console.log('Amp Usage Saved:', res));
  }

  /** ✅ 2nd Pass: Create two pedals */
  createPedals() {
    const pedal1: CreatePedalRequest = {
      name: 'Tube Screamer',
      type: 'Overdrive',
      knobs: ['Drive', 'Tone', 'Level'],
    };
    const pedal2: CreatePedalRequest = {
      name: 'Big Muff',
      type: 'Fuzz',
      knobs: ['Sustain', 'Tone', 'Volume'],
    };

    this.apiTestService.createPedal(pedal1).subscribe(() => this.fetchPedals());
    this.apiTestService.createPedal(pedal2).subscribe(() => this.fetchPedals());
  }

  /** ✅ Get all pedals */
  fetchPedals() {
    this.apiTestService.getPedals().subscribe((pedals) => {
      this.pedals = pedals;
      console.log('All Pedals:', this.pedals);
    });
  }

  /** ✅ Create a pedalboard */
  createPedalBoard() {
    const pedalBoardData: CreatePedalBoardRequest = {
      name: 'Blues Rig',
      pedals: [
        {
          pedalId: this.pedals[0]?._id!,
          order: 1,
          knobValues: { Drive: 5, Tone: 6, Level: 7 },
        },
        {
          pedalId: this.pedals[1]?._id!,
          order: 2,
          knobValues: { Sustain: 8, Tone: 5, Volume: 6 },
        },
      ],
    };

    this.apiTestService
      .createPedalBoard(pedalBoardData)
      .subscribe(() => this.fetchPedalBoards());
  }

  /** ✅ Get all pedalboards */
  fetchPedalBoards() {
    this.apiTestService.getPedalBoards().subscribe((boards) => {
      this.pedalBoards = boards;
      console.log('All PedalBoards:', this.pedalBoards);
    });
  }

  /** ✅ 3rd Pass: Pair amp with pedalboard */
  pairAmpWithPedalBoard() {
    if (!this.selectedAmp || !this.selectedPedalBoard) return;

    const pairingData: CreatePairingRequest = {
      ampId: this.selectedAmp._id,
      pedalBoardId: this.selectedPedalBoard._id,
    };
    this.apiTestService
      .pairAmpWithPedalBoard(pairingData)
      .subscribe((res) => console.log('Amp & PedalBoard Paired:', res));
  }
}
