import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CreatePedalRequest } from '@guitar/interfaces';
import { ApiTestService } from '../../services';

@Component({
  selector: 'lib-create-pedal',
  templateUrl: './create-pedal.component.html',
  styleUrl: './create-pedal.component.scss',
})
export class CreatePedalComponent {
  pedalForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    knobs: this.fb.array([]),
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiTestService
  ) {}

  get knobs(): FormArray {
    return this.pedalForm.get('knobs') as FormArray;
  }

  addKnob() {
    this.knobs.push(this.fb.control('', Validators.required));
  }

  removeKnob(index: number) {
    this.knobs.removeAt(index);
  }

  submit() {
    if (this.pedalForm.valid) {
      const pedalData = this.pedalForm.value as CreatePedalRequest;
      this.apiService.createPedal(pedalData).subscribe((res) => {
        console.log('Pedal Created:', res);
        this.pedalForm.reset();
        this.knobs.clear();
      });
    }
  }
}
