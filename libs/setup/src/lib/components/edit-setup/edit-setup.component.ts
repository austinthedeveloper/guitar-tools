import { Component, inject, Input } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Amp, AmpControl, Pedal, PedalBoard } from '@guitar/interfaces';
import { ControlGroup } from '../../interfaces';

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
    pedals: this.fb.array([]),
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
    console.log('pedalboard change', this.pedalboard);
  }
  submit() {}
}
