import { Component, Input } from '@angular/core';
import { Pedal, PedalBoard } from '@guitar/interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
    selector: 'lib-pedalboard-modal',
    templateUrl: './pedalboard-modal.component.html',
    styleUrl: './pedalboard-modal.component.scss',
    standalone: false
})
export class PedalboardModalComponent {
  @Input() pedalboard!: PedalBoard;
  @Input() pedals$!: Observable<Pedal[]>;
  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }
}
