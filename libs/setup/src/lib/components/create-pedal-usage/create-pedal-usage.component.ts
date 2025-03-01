import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Pedal } from '@guitar/interfaces';

import { PedalUsageService } from '../../services';

@Component({
  selector: 'lib-create-pedal-usage',
  templateUrl: './create-pedal-usage.component.html',
  styleUrl: './create-pedal-usage.component.scss',
})
export class CreatePedalUsageComponent {
  pedalUsageForm = this.fb.group({
    name: ['', Validators.required],
    pedalId: ['', Validators.required],
    knobs: this.fb.array([]), // This will hold knob values dynamically
  });
  @Input() pedals: Pedal[] = [];
  selectedPedalKnobs: { name: string }[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private pedalUsageService: PedalUsageService
  ) {}

  get knobControls() {
    return this.pedalUsageForm.get('knobs') as FormArray<FormGroup>;
  }

  getKnobGroup(index: number): FormGroup {
    return this.knobControls.at(index) as FormGroup;
  }

  // When a pedal is selected, update the knobs array
  onPedalChange(pedalId: string) {
    const selectedPedal = this.pedals.find((pedal) => pedal._id === pedalId);
    if (selectedPedal) {
      this.selectedPedalKnobs = selectedPedal.knobs.map((knob) => ({
        name: knob,
      }));
      this.updateKnobControls();
    }
  }

  // Update knob form controls dynamically
  updateKnobControls() {
    const knobsArray = this.pedalUsageForm.get('knobs') as FormArray;
    knobsArray.clear();
    this.selectedPedalKnobs.forEach((knob) => {
      knobsArray.push(this.fb.group({ name: knob.name, value: [''] }));
    });
  }

  // Submit form to API
  submitPedalUsage() {
    if (this.pedalUsageForm.valid) {
      this.pedalUsageService
        .createPedalUsage(this.pedalUsageForm.value)
        .subscribe((res) => {
          console.log('Pedal Usage Created:', res);
          this.pedalUsageForm.reset();
          this.knobControls.clear();
        });
    }
  }
}
