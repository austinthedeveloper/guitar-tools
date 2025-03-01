import { Component } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CreatePedalRequest, PedalType } from '@guitar/interfaces';

import { PedalService } from '../../services';
import { PEDAL_KNOBS, PEDAL_TYPES } from '../../helpers';

@Component({
  selector: 'lib-create-pedal',
  templateUrl: './create-pedal.component.html',
  styleUrl: './create-pedal.component.scss',
})
export class CreatePedalComponent {
  pedalForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    knobs: this.fb.array([]),
  });
  typeOptions: PedalType[] = PEDAL_TYPES;
  pedalKnobs = PEDAL_KNOBS;

  constructor(
    private fb: NonNullableFormBuilder,
    private pedalService: PedalService
  ) {}

  get knobs(): FormArray {
    return this.pedalForm.get('knobs') as FormArray;
  }

  addKnob() {
    this.knobs.push(this.fb.control('', Validators.required));
  }

  removeKnob(index: number) {
    this.knobs.removeAt(index);
  }

  submit() {
    if (this.pedalForm.valid) {
      const pedalData = this.pedalForm.value as CreatePedalRequest;
      this.pedalService.createPedal(pedalData).subscribe((res) => {
        console.log('Pedal Created:', res);
        this.pedalForm.reset();
        this.knobs.clear();
      });
    }
  }
}
