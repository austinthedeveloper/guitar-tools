import { Component, Input } from '@angular/core';
import { Amp } from '@guitar/interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'lib-amp-modal',
    templateUrl: './amp-modal.component.html',
    styleUrl: './amp-modal.component.scss',
    standalone: false
})
export class AmpModalComponent {
  @Input() amp!: Amp;
  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }
}
