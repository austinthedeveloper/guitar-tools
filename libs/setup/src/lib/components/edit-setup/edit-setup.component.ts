import { Component, inject, Input } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  Amp,
  AmpControl,
  Pedal,
  PedalBoard,
  PedalBoardPedal,
} from '@guitar/interfaces';

import {
  ControlGroup,
  PedalControlGroupNew,
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
  form = this.fb.group({
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
      knobs: this.fb.array<FormGroup<PedalKnob>>([]),
      on: false,
      pedal: pedal,
      knobsNew: this.fb.group(knobs),
    });
    pedal.pedal.knobs.forEach((knob) => {
      const group = this.fb.group({ name: knob, value: [0] });
      pedalForm.controls.knobs.push(group);
    });
    this.form.controls.pedals.push(pedalForm);
  }
  submit() {}
}
