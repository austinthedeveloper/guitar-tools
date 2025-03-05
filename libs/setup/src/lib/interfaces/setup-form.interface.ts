import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { Pedal, PedalBoardPedal } from '@guitar/interfaces';

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
export interface PedalControlGroupNew {
  pedalId: FormControl<string>;
  order: FormControl<number>;
  knobs: FormArray<FormGroup<PedalKnob>>;
  on: FormControl<boolean>;
  pedal: FormControl<PedalBoardPedal>;
  knobsNew: FormGroup<{
    [x: string]: FormControl<number>;
  }>;
}
export interface PedalKnob {
  name: FormControl<string>;
  value: FormControl<number>;
}
