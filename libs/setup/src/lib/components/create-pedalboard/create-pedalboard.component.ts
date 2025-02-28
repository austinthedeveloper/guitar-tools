import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Pedal, CreatePedalBoardRequest } from '@guitar/interfaces';
import { ApiTestService } from '../../services';

@Component({
  selector: 'lib-create-pedalboard',
  templateUrl: './create-pedalboard.component.html',
  styleUrl: './create-pedalboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  addPedal() {
    this.pedalControls.push(
      this.fb.group({
        pedalId: ['', Validators.required],
        order: [this.pedalControls.length + 1, Validators.required],
        knobValues: [{}],
      })
    );
  }

  removePedal(index: number) {
    this.pedalControls.removeAt(index);
  }

  submit() {
    if (this.pedalboardForm.valid) {
      const pedalboardData = this.pedalboardForm
        .value as CreatePedalBoardRequest;
      this.apiService.createPedalBoard(pedalboardData).subscribe((res) => {
        console.log('Pedalboard Created:', res);
        this.pedalboardForm.reset();
        this.pedalControls.clear();
      });
    }
  }
}
