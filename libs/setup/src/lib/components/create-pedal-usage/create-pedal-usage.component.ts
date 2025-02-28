import { Component } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ApiTestService } from '../../services';
import { Pedal } from '@guitar/interfaces';

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
  pedals: Pedal[] = [];
  selectedPedalKnobs: { name: string }[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiTestService
  ) {}

  ngOnInit() {
    this.loadPedals();
  }
  get knobControls() {
    return this.pedalUsageForm.get('knobs') as FormArray<FormGroup>;
  }

  getKnobGroup(index: number): FormGroup {
    return this.knobControls.at(index) as FormGroup;
  }

  // Fetch pedals from API
  loadPedals() {
    this.apiService.getPedals().subscribe((pedals) => {
      console.log('pedals', pedals);

      this.pedals = pedals;
    });
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
      console.log('test form', this.pedalUsageForm.value);
      this.apiService
        .createPedalUsage(this.pedalUsageForm.value)
        .subscribe((res) => {
          console.log('Pedal Usage Created:', res);
          this.pedalUsageForm.reset();
          this.knobControls.clear();
        });
    }
  }
}
