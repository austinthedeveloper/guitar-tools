import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Amp, SaveAmpUsageRequest } from '@guitar/interfaces';
import { ApiTestService } from '../../services';

@Component({
  selector: 'lib-create-amp-usage',
  templateUrl: './create-amp-usage.component.html',
  styleUrl: './create-amp-usage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAmpUsageComponent {
  ampUsageForm = this.fb.group({
    name: ['', Validators.required],
    ampId: ['', Validators.required],
    knobValues: this.fb.array([]),
  });
  amps: Amp[] = [];
  selectedAmpKnobs: string[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiTestService
  ) {}

  ngOnInit(): void {
    this.apiService.getAmps().subscribe((data) => (this.amps = data));
  }

  get knobValues(): FormArray {
    return this.ampUsageForm.get('knobValues') as FormArray;
  }
  getKnobGroup(index: number): FormGroup {
    return this.knobValues.at(index) as FormGroup;
  }

  onAmpChange() {
    const selectedAmpId = this.ampUsageForm.get('ampId')?.value;
    const selectedAmp = this.amps.find((amp) => amp._id === selectedAmpId);

    if (selectedAmp) {
      this.selectedAmpKnobs = selectedAmp.knobs;
      this.knobValues.clear();
      this.selectedAmpKnobs.forEach((knob) => {
        this.knobValues.push(
          this.fb.group({ name: knob, value: [0, Validators.required] })
        );
      });
    }
  }

  submit() {
    if (this.ampUsageForm.valid) {
      const knobValuesObject = this.knobValues.value.reduce(
        (acc: any, knob: any) => {
          acc[knob.name] = knob.value;
          return acc;
        },
        {}
      );

      const ampUsageData: SaveAmpUsageRequest = {
        name: this.ampUsageForm.get('name')?.value,
        ampId: this.ampUsageForm.get('ampId')?.value,
        knobValues: knobValuesObject,
      };

      this.apiService.saveAmpUsage(ampUsageData).subscribe((res) => {
        console.log('Amp Usage Created:', res);
        this.ampUsageForm.reset();
        this.knobValues.clear();
      });
    }
  }
}
