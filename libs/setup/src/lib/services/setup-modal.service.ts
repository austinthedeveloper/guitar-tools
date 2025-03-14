import { Injectable } from '@angular/core';
import { AiSettingsResponse, Amp, Pedal, PedalBoard } from '@guitar/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmpModalComponent } from '../components/amp-modal/amp-modal.component';
import { PedalModalComponent } from '../components/pedal-modal/pedal-modal.component';
import { PedalboardModalComponent } from '../components/pedalboard-modal/pedalboard-modal.component';
import { AiSettingsModalComponent } from '../components/ai-settings-modal/ai-settings-modal.component';

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

  openAiModal(
    amp: string,
    pedals: string[],
    genreOptions: string[],
    pedalboardId: string
  ) {
    const modalRef = this.modalService.open(AiSettingsModalComponent, {
      size: 'lg',
    });
    const instance: AiSettingsModalComponent = modalRef.componentInstance;
    instance.amp = amp;
    instance.pedals = pedals;
    instance.genreOptions = genreOptions;
    instance.pedalboardId = pedalboardId;
    return instance;
  }
}
