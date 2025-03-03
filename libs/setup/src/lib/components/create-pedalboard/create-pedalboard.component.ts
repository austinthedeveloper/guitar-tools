import { Component, Input } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CreatePedalBoardRequest, Pedal } from '@guitar/interfaces';

import { PedalControlGroup, PedalKnob } from '../../interfaces';
import { PedalBoardService } from '../../services';

@Component({
  selector: 'lib-create-pedalboard',
  templateUrl: './create-pedalboard.component.html',
  styleUrl: './create-pedalboard.component.scss',
})
export class CreatePedalboardComponent {
  pedalboardForm = this.fb.group({
    name: ['', Validators.required],
    pedals: this.fb.array<FormGroup<PedalControlGroup>>([]),
  });
  @Input() pedals: Pedal[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private pedalBoardService: PedalBoardService
  ) {}
  get pedalControls() {
    return this.pedalboardForm.controls.pedals;
  }

  getPedalGroup(index: number) {
    return this.pedalControls.at(index);
  }

  addPedal() {
    this.pedalControls.push(
      this.fb.group({
        pedalId: ['', Validators.required],
        order: [this.pedalControls.length + 1, Validators.required],
        knobs: this.fb.array<FormGroup<PedalKnob>>([]),
      })
    );
  }

  onPedalChange(pedalGroup: FormGroup<PedalControlGroup>) {
    const pedalId = pedalGroup.controls.pedalId.value;
    const selectedPedal = this.pedals.find((p) => p._id === pedalId);
    if (!selectedPedal) return;

    const knobsArray = pedalGroup.controls.knobs;

    // Clear old knobs if switching pedals
    knobsArray.clear();

    // Add knobs dynamically
    selectedPedal.knobs.forEach((knob) => {
      knobsArray.push(this.fb.group({ name: knob, value: [0] }));
    });
  }

  removePedal(index: number) {
    this.pedalControls.removeAt(index);
  }
  submit() {
    if (this.pedalboardForm.valid) {
      const pedalboardData = this.pedalboardForm
        .value as CreatePedalBoardRequest;

      // Format knobValues correctly
      pedalboardData.pedals.forEach((pedal) => {
        pedal.knobValues = {};
        pedal.knobs.forEach((knob) => {
          pedal.knobValues[knob.name] = knob.value;
        });
        delete pedal.knobs; // Remove knobs array before sending to API
      });
      this.pedalBoardService
        .createPedalBoard(pedalboardData)
        .subscribe((res) => {
          console.log('Pedalboard Created:', res);
          this.pedalboardForm.reset();
          this.pedalControls.clear();
        });
    }
  }
}
