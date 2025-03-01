import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  AmpControl,
  AmpInputControls,
  CreateAmpRequest,
} from '@guitar/interfaces';

import { AMP_INPUTS, AMP_KNOBS } from '../../helpers';
import { AmpService } from './../../services';

@Component({
  selector: 'lib-create-amp',
  templateUrl: './create-amp.component.html',
  styleUrl: './create-amp.component.scss',
})
export class CreateAmpComponent {
  @Input() disabled!: boolean;
  @Output() save = new EventEmitter();

  ampForm = this.fb.group({
    name: ['', Validators.required],
    brand: [''],
    controls: this.fb.array([]),
  });
  controlOptions = [...AMP_INPUTS, ...AMP_KNOBS];
  controlTypes = AmpInputControls;

  constructor(
    private fb: NonNullableFormBuilder,
    private ampService: AmpService
  ) {
    this.addControl('Input 1', 'input');
  }

  get controls(): FormArray {
    return this.ampForm.controls.controls;
  }

  getControl(i: number) {
    return this.controls.controls[i] as FormGroup;
  }

  addControl(name = '', type = 'input') {
    const index = this.controls.length;
    this.controls.push(
      this.fb.group({
        name: [name, Validators.required],
        value: [0],
        type: [type, Validators.required],
        order: [index],
        values: this.fb.array([]),
      })
    );
  }

  removeControl(index: number) {
    this.controls.removeAt(index);
  }

  onControlChange(formGroup: FormGroup) {
    const name = formGroup.controls['name'].value;
    const type = this.controlOptions.find((option) => option.name === name);
    formGroup.controls['type'].patchValue(type.type);
  }

  submit() {
    if (this.ampForm.valid) {
      const ampData = this.ampForm.value as CreateAmpRequest;
      const controls = this.mapControls(ampData.controls);
      const mappedData: CreateAmpRequest = { ...ampData, controls };
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
    this.addControl('Input 1', 'input');
  }

  private mapControls(controls: AmpControl[]) {
    return controls.map((control, i) => ({
      ...control,
      order: i,
    }));
  }
}
