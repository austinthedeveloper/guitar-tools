import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AmpUsage, CreatePairingRequest, PedalBoard } from '@guitar/interfaces';

import { AmpService, PairingService } from '../../../services';
import { PedalBoardService } from '../../../services/pedalboard.service';

@Component({
  selector: 'lib-create-pairing',
  templateUrl: './create-pairing.component.html',
  styleUrl: './create-pairing.component.scss',
})
export class CreatePairingComponent {
  pairingForm = this.fb.group({
    ampUsageId: ['', Validators.required],
    pedalBoardId: ['', Validators.required],
  });
  ampUsages: AmpUsage[] = [];
  pedalBoards: PedalBoard[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private ampService: AmpService,
    private pedalBoardService: PedalBoardService,
    private pairingService: PairingService
  ) {}

  ngOnInit(): void {
    this.ampService.getAmpUsages().subscribe((data) => (this.ampUsages = data));
    this.pedalBoardService
      .getPedalBoards()
      .subscribe((data) => (this.pedalBoards = data));
  }

  submit() {
    if (this.pairingForm.valid) {
      const pairingData = this.pairingForm.value as CreatePairingRequest;
      this.pairingService
        .pairAmpWithPedalBoard(pairingData)
        .subscribe((res) => {
          console.log('Pairing Created:', res);
          this.pairingForm.reset();
        });
    }
  }
}
