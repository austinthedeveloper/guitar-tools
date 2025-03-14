import { Injectable } from '@angular/core';
import { Amp, Pedal, PedalBoard } from '@guitar/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmpModalComponent } from '../components/amp-modal/amp-modal.component';
import { PedalModalComponent } from '../components/pedal-modal/pedal-modal.component';
import { PedalboardModalComponent } from '../components/pedalboard-modal/pedalboard-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SetupModalService {
  constructor(private modalService: NgbModal) {}

  openAmpModal(amp?: Amp) {
    const modalRef = this.modalService.open(AmpModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.amp = amp;
  }

  openPedalModal(pedal?: Pedal) {
    const modalRef = this.modalService.open(PedalModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.pedal = pedal;
  }

  openPedalboardModal(pedalboard?: PedalBoard, pedals$?: any) {
    const modalRef = this.modalService.open(PedalboardModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.pedalboard = pedalboard;
    modalRef.componentInstance.pedals$ = pedals$;
  }
}
