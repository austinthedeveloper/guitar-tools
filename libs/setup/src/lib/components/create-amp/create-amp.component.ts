import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { AmpKnob, CreateAmpRequest } from '@guitar/interfaces';

import { AmpService } from './../../services';
import { AMP_KNOBS } from '../../helpers';

@Component({
  selector: 'lib-create-amp',
  templateUrl: './create-amp.component.html',
  styleUrl: './create-amp.component.scss',
})
export class CreateAmpComponent {
  ampForm = this.fb.group({
    name: ['', Validators.required],
    brand: [''],
    inputs: this.fb.array([this.fb.control('Input 1', Validators.required)]),
    knobs: this.fb.array([]),
  });
  ampKnobs = AMP_KNOBS;

  @Output() save = new EventEmitter();

  constructor(
    private fb: NonNullableFormBuilder,
    private ampService: AmpService
  ) {}

  get knobs(): FormArray {
    return this.ampForm.get('knobs') as FormArray;
  }

  getKnob(i: number) {
    return this.knobs.controls[i] as FormGroup;
  }

  get inputs(): FormArray {
    return this.ampForm.get('inputs') as FormArray;
  }

  addKnob(knobName = '') {
    const index = this.knobs.length;
    this.knobs.push(
      this.fb.group({
        name: [knobName, Validators.required],
        value: [0],
        order: [index], // 👈 Set initial order based on FormArray index
      })
    );
  }

  removeKnob(index: number) {
    this.knobs.removeAt(index);
  }

  addInput() {
    this.inputs.push(this.fb.control('', Validators.required));
  }

  removeInput(index: number) {
    this.inputs.removeAt(index);
  }

  submit() {
    if (this.ampForm.valid) {
      const ampData = this.ampForm.value as CreateAmpRequest;
      const knobs = this.mapKnobs(ampData.knobs);
      const mappedData = { ...ampData, knobs };
      this.save.emit(mappedData);

      this.ampService.createAmp(mappedData).subscribe((res) => {
        console.log('Amp Created:', res);
        this.clearForm();
      });
    }
  }

  private clearForm() {
    this.ampForm.reset();
    this.knobs.clear();
    this.inputs.clear();
    this.inputs.push(this.fb.control('Input 1', Validators.required));
  }

  private mapKnobs(knobs: AmpKnob[]) {
    return knobs.map((knob, i) => ({ ...knob, order: i }));
  }
}
