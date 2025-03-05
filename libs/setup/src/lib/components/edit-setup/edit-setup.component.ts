import { PairingService } from './../../services/pairing.service';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  Amp,
  AmpControl,
  PairingPayload,
  Pedal,
  PedalBoard,
  PedalBoardPedal,
  PedalEntry,
} from '@guitar/interfaces';

import {
  ControlGroup,
  PedalControlGroupNew,
  PedalFormGroup,
  PedalKnob,
} from '../../interfaces';

@Component({
  selector: 'lib-edit-setup',
  templateUrl: './edit-setup.component.html',
  styleUrl: './edit-setup.component.scss',
})
export class EditSetupComponent {
  @Input() amps: Amp[] = [];
  @Input() pedals: Pedal[] = [];
  @Input() pedalboards: PedalBoard[] = [];
  private fb = inject(NonNullableFormBuilder);
  private pairingService = inject(PairingService);
  form: FormGroup<PedalFormGroup> = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    ampId: '',
    pedalboardId: '',
    pedals: this.fb.array<FormGroup<PedalControlGroupNew>>([]),
    controlValues: this.fb.array<FormGroup<ControlGroup>>([]),
  });
  ampControls: AmpControl[] = [];
  pedalboard!: PedalBoard;

  get controlValues() {
    return this.form.controls.controlValues;
  }

  onAmpChange() {
    const selectedAmpId = this.form.controls.ampId.value;
    const selectedAmp = this.amps.find((amp) => amp._id === selectedAmpId);

    if (selectedAmp) {
      this.ampControls = selectedAmp.controls;
      this.controlValues.clear();
      this.ampControls.forEach((control) => {
        this.controlValues.push(
          this.fb.group({
            name: control.name,
            type: control.type,
            value: [0],
          })
        );
      });
    }
  }

  onPedalboardChange() {
    const pedalboardId = this.form.controls.pedalboardId.value;
    this.pedalboard = this.pedalboards.find(
      (board) => board._id === pedalboardId
    );
    this.form.controls.pedals.clear();
    this.pedalboard.pedals.forEach((pedal, index) =>
      this.addPedal(pedal, index)
    );
  }

  private addPedal(pedal: PedalBoardPedal, index: number) {
    const knobs = pedal.pedal.knobs.reduce((acc, item) => {
      acc[item] = 0;
      return acc;
    }, {} as Record<string, number>);
    const pedalForm = this.fb.group({
      pedalId: [pedal.pedalId, Validators.required],
      order: [index, Validators.required],
      on: false,
      pedal: pedal,
      knobs: this.fb.group(knobs),
    });

    this.form.controls.pedals.push(pedalForm);
  }
  submit() {
    const { _id, ...formValue } = this.form.value;
    const payload: PairingPayload = {
      ...formValue,
      pedals: formValue.pedals.map(({ pedal, ...rest }) => rest as PedalEntry),
    };
    const call = _id
      ? this.pairingService.updatePairing(_id, payload)
      : this.pairingService.createPairing(payload);

    call.subscribe((res) => {
      console.log('success', res);
      this.form.controls._id.patchValue(res._id);
    });
  }
}
