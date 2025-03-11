import { Component, Input } from '@angular/core';
import { Pedal } from '@guitar/interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-pedal-modal',
  templateUrl: './pedal-modal.component.html',
  styleUrl: './pedal-modal.component.scss',
})
export class PedalModalComponent {
  @Input() pedal!: Pedal;
  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }
}
