import { Component, Input } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AmpUsage, CreatePairingRequest, PedalBoard } from '@guitar/interfaces';

import { PairingService } from '../../services';

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
  @Input() ampUsages: AmpUsage[] = [];
  @Input() pedalBoards: PedalBoard[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private pairingService: PairingService
  ) {}

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
