import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  AmpControl,
  AmpInputControls,
  AmpInputControlType,
  AmpKnob,
  CreateAmpRequest,
} from '@guitar/interfaces';

import { AmpService } from './../../services';
import { AMP_INPUTS, AMP_KNOBS } from '../../helpers';

@Component({
  selector: 'lib-create-amp',
  templateUrl: './create-amp.component.html',
  styleUrl: './create-amp.component.scss',
})
export class CreateAmpComponent {
  ampForm = this.fb.group({
    name: ['', Validators.required],
    brand: [''],
    controls: this.fb.array([
      this.fb.group({
        name: this.fb.control('Input 1', Validators.required),
        type: 'input',
        order: 0,
      }),
    ]),
  });
  controlOptions = [...AMP_INPUTS, ...AMP_KNOBS];
  controlTypes = AmpInputControls;

  @Output() save = new EventEmitter();

  constructor(
    private fb: NonNullableFormBuilder,
    private ampService: AmpService
  ) {}

  get controls(): FormArray {
    return this.ampForm.controls.controls;
  }

  getControl(i: number) {
    return this.controls.controls[i] as FormGroup;
  }

  addControl(name = '') {
    const index = this.controls.length;
    this.controls.push(
      this.fb.group({
        name: [name, Validators.required],
        value: [0],
        type: [null, Validators.required],
        order: [index], // 👈 Set initial order based on FormArray index
        values: this.fb.array([]),
      })
    );
  }

  removeControl(index: number) {
    this.controls.removeAt(index);
  }

  submit() {
    if (this.ampForm.valid) {
      const ampData = this.ampForm.value as CreateAmpRequest;
      const controls = this.mapControls(ampData.controls);
      const mappedData = { ...ampData, controls };
      this.save.emit(mappedData);

      this.ampService.createAmp(mappedData).subscribe((res) => {
        console.log('Amp Created:', res);
        this.clearForm();
      });
    }
  }

  private clearForm() {
    this.ampForm.reset();
    this.controls.clear();
    this.controls.push(
      this.fb.group({
        name: this.fb.control('Input 1', Validators.required),
        type: 0,
        order: 0,
      })
    );
  }

  private mapControls(controls: AmpControl[]) {
    return controls.map((control, i) => ({
      ...control,
      order: i,
    }));
  }
}
