import { FormControl, FormArray, FormGroup } from '@angular/forms';

// Amp Usage
export interface ControlGroup {
  name: FormControl<string>;
  type: FormControl<string>;
  value: FormControl<number>;
}

// Pedalboard
export interface PedalControlGroup {
  pedalId: FormControl<string>;
  order: FormControl<number>;
  knobs: FormArray<FormGroup<PedalKnob>>;
}
export interface PedalKnob {
  name: FormControl<string>;
  value: FormControl<number>;
}
