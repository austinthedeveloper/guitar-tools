import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Amp, AmpControl, SaveAmpUsageRequest } from '@guitar/interfaces';

import { AmpUsageService } from '../../services';

@Component({
  selector: 'lib-create-amp-usage',
  templateUrl: './create-amp-usage.component.html',
  styleUrl: './create-amp-usage.component.scss',
})
export class CreateAmpUsageComponent {
  ampUsageForm = this.fb.group({
    name: ['', Validators.required],
    ampId: ['', Validators.required],
    knobValues: this.fb.array([]),
    controlValues: this.fb.array([]),
  });
  @Input() amps: Amp[] = [];
  ampControls: AmpControl[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private ampUsageService: AmpUsageService
  ) {}

  get knobValues(): FormArray {
    return this.ampUsageForm.get('knobValues') as FormArray;
  }
  getKnobGroup(index: number): FormGroup {
    return this.knobValues.at(index) as FormGroup;
  }
  get controlValues(): FormArray {
    return this.ampUsageForm.controls.controlValues;
  }
  getControlGroup(index: number): FormGroup {
    return this.controlValues.at(index) as FormGroup;
  }

  onAmpChange() {
    const selectedAmpId = this.ampUsageForm.get('ampId')?.value;
    const selectedAmp = this.amps.find((amp) => amp._id === selectedAmpId);

    if (selectedAmp) {
      this.ampControls = selectedAmp.controls;
      this.controlValues.clear();
      this.ampControls.forEach((control: any) => {
        this.controlValues.push(
          this.fb.group({
            name: control.name,
            type: control.type,
            value: [null],
          })
        );
      });
    }
  }

  submit() {
    if (this.ampUsageForm.valid) {
      const controlValuesObject = this.controlValues.value.reduce(
        (acc: any, control: any) => {
          acc[control.name] = control.value;
          return acc;
        },
        {}
      );

      const ampUsageData: SaveAmpUsageRequest = {
        name: this.ampUsageForm.get('name')?.value,
        ampId: this.ampUsageForm.get('ampId')?.value,
        controlValues: controlValuesObject,
      };

      this.ampUsageService.saveAmpUsage(ampUsageData).subscribe((res) => {
        console.log('Amp Usage Created:', res);
        this.ampUsageForm.reset();
        this.controlValues.clear();
      });
    }
  }
}
