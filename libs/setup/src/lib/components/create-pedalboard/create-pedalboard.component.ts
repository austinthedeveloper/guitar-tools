import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CreatePedalBoardRequest, Pedal } from '@guitar/interfaces';

import { ApiTestService } from '../../services';

@Component({
  selector: 'lib-create-pedalboard',
  templateUrl: './create-pedalboard.component.html',
  styleUrl: './create-pedalboard.component.scss',
})
export class CreatePedalboardComponent {
  pedalboardForm = this.fb.group({
    name: ['', Validators.required],
    pedals: this.fb.array([]),
  });
  pedals: Pedal[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiTestService
  ) {}

  ngOnInit(): void {
    this.apiService.getPedals().subscribe((data) => (this.pedals = data));
  }

  get pedalControls(): FormArray {
    return this.pedalboardForm.get('pedals') as FormArray<FormGroup>;
  }

  getPedalGroup(index: number): FormGroup {
    return this.pedalControls.at(index) as FormGroup;
  }
  getPedalKnobs(index: number): FormArray {
    return this.getPedalGroup(index).get('knobs') as FormArray;
  }
  getPedalKnob(pedalIndex: number, index: number): FormGroup {
    const knobs = this.getPedalKnobs(pedalIndex);
    return knobs.at(index) as FormGroup;
  }

  addPedal() {
    this.pedalControls.push(
      this.fb.group({
        pedalId: ['', Validators.required],
        order: [this.pedalControls.length + 1, Validators.required],
        knobs: this.fb.array([]),
      })
    );
  }

  onPedalChange(event: Event, index: number) {
    const target = event.target as HTMLInputElement;
    const pedalId = target.value;
    const selectedPedal = this.pedals.find((p) => p._id === pedalId);
    if (!selectedPedal) return;

    const pedalGroup = this.getPedalGroup(index);
    const knobsArray = pedalGroup.get('knobs') as FormArray;

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
      this.apiService.createPedalBoard(pedalboardData).subscribe((res) => {
        console.log('Pedalboard Created:', res);
        this.pedalboardForm.reset();
        this.pedalControls.clear();
      });
    }
  }
}
