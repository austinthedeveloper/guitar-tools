import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CreatePedalRequest, Pedal, PedalType } from '@guitar/interfaces';

import { PedalService } from '../../services';
import { PEDAL_KNOBS, PEDAL_TYPES } from '../../helpers';
import { tap } from 'rxjs';

@Component({
  selector: 'lib-create-pedal',
  templateUrl: './create-pedal.component.html',
  styleUrl: './create-pedal.component.scss',
})
export class CreatePedalComponent {
  @Input() pedal!: Pedal;
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter<string>();
  form = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    type: ['', Validators.required],
    knobs: this.fb.array<FormControl<string>>([]),
  });
  typeOptions: PedalType[] = PEDAL_TYPES;
  pedalKnobs = PEDAL_KNOBS;

  constructor(
    private fb: NonNullableFormBuilder,
    private pedalService: PedalService
  ) {}

  ngOnChanges({ pedal }: SimpleChanges) {
    if (pedal && pedal.currentValue) {
      this.setPedal();
    }
  }

  private setPedal() {
    this.form.patchValue({
      _id: this.pedal._id,
      name: this.pedal.name,
      type: this.pedal.type,
    });
    this.pedal.knobs.forEach((pedal) => {
      this.addKnob(pedal);
    });
  }

  get knobs() {
    return this.form.controls.knobs;
  }

  addKnob(value?: string) {
    this.knobs.push(this.fb.control(value || '', Validators.required));
  }

  removeKnob(index: number) {
    this.knobs.removeAt(index);
  }

  submit() {
    if (this.form.invalid) return;
    const { _id, ...pedalData } = this.form.value;

    const call = _id
      ? this.pedalService.update(_id, pedalData as Pedal)
      : this.pedalService
          .create(pedalData as CreatePedalRequest)
          .pipe(tap(() => this.clearForm()));

    call.subscribe((res) => {
      console.log('Pedal Created:', res);
      this.save.emit();
    });
  }

  deletePedal(id: string) {
    this.pedalService.delete(id).subscribe(() => this.delete.emit(id));
  }

  private clearForm() {
    this.form.reset();
    this.knobs.clear();
  }
}
