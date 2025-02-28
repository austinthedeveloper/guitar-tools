import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AmpUsage, PedalBoard, CreatePairingRequest } from '@guitar/interfaces';
import { ApiTestService } from '../../services';

@Component({
  selector: 'lib-create-pairing',
  templateUrl: './create-pairing.component.html',
  styleUrl: './create-pairing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private apiService: ApiTestService
  ) {}

  ngOnInit(): void {
    this.apiService.getAmpUsages().subscribe((data) => (this.ampUsages = data));
    this.apiService
      .getPedalBoards()
      .subscribe((data) => (this.pedalBoards = data));
  }

  submit() {
    if (this.pairingForm.valid) {
      const pairingData = this.pairingForm.value as CreatePairingRequest;
      this.apiService.pairAmpWithPedalBoard(pairingData).subscribe((res) => {
        console.log('Pairing Created:', res);
        this.pairingForm.reset();
      });
    }
  }
}
