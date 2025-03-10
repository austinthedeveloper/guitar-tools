import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { Pedal, PedalBoardPedal } from '@guitar/interfaces';

// Amp Usage
export interface ControlGroup {
  name: FormControl<string>;
  type: FormControl<string>;
  value: FormControl<number>;
}

// Pedalboard
export interface PedalFormGroup {
  _id: FormControl<string>;
  name: FormControl<string>;
  ampId: FormControl<string>;
  pedalboardId: FormControl<string>;
  pedals: FormArray<FormGroup<PedalControlGroupNew>>;
  controlValues: FormArray<FormGroup<ControlGroup>>;
}
export interface PedalControlGroup {
  pedalId: FormControl<string>;
  order: FormControl<number>;
  knobs: FormArray<FormGroup<PedalKnob>>;
}
export interface PedalControlGroupNew {
  pedalId: FormControl<string>;
  order: FormControl<number>;
  on: FormControl<boolean>;
  pedal: FormControl<PedalBoardPedal>;
  knobs: FormGroup<{
    [x: string]: FormControl<number>;
  }>;
}
export interface PedalKnob {
  name: FormControl<string>;
  value: FormControl<number>;
}

// Create Amp
export interface AmpControlsGroup {
  name: FormControl<string>;
  value: FormControl<number>;
  type: FormControl<string>;
  order: FormControl<number>;
  values: FormArray;
}
