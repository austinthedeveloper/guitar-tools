import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  CreatePedalBoardRequest,
  Pedal,
  PedalBoard,
  PedalboardKnobValues,
  PedalBoardPedal,
} from '@guitar/interfaces';

import { PedalControlGroup, PedalKnob } from '../../interfaces';
import { PedalBoardService } from '../../services';
import { tap } from 'rxjs';

@Component({
  selector: 'lib-create-pedalboard',
  templateUrl: './create-pedalboard.component.html',
  styleUrl: './create-pedalboard.component.scss',
})
export class CreatePedalboardComponent {
  form = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    pedals: this.fb.array<FormGroup<PedalControlGroup>>([]),
  });
  @Input() pedalboard!: PedalBoard;
  @Input() pedals: Pedal[] = [];
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter<string>();

  constructor(
    private fb: NonNullableFormBuilder,
    private pedalBoardService: PedalBoardService
  ) {}

  ngOnChanges({ pedalboard }: SimpleChanges) {
    if (pedalboard && pedalboard.currentValue) {
      this.setPedalBoard();
    }
  }

  private setPedalBoard() {
    this.clearForm();
    this.form.patchValue({
      _id: this.pedalboard._id,
      name: this.pedalboard.name,
    });
    this.pedalboard.pedals.forEach((pedal) => this.addPedal(pedal));
  }

  get pedalControls() {
    return this.form.controls.pedals;
  }

  getPedalGroup(index: number) {
    return this.pedalControls.at(index);
  }

  addPedal(value?: PedalBoardPedal) {
    const group = this.fb.group({
      pedalId: ['', Validators.required],
      order: [this.pedalControls.length + 1, Validators.required],
      knobs: this.fb.array<FormGroup<PedalKnob>>([]),
    });
    if (value) {
      group.patchValue(value);
      this.onPedalChange(group, value.knobValues);
    }
    this.pedalControls.push(group);
  }

  onPedalChange(
    pedalGroup: FormGroup<PedalControlGroup>,
    knobValues?: PedalboardKnobValues
  ) {
    const pedalId = pedalGroup.controls.pedalId.value;
    const selectedPedal = this.pedals.find((p) => p._id === pedalId);
    if (!selectedPedal) return;

    const knobsArray = pedalGroup.controls.knobs;

    // Clear old knobs if switching pedals
    knobsArray.clear();

    // Add knobs dynamically
    selectedPedal.knobs.forEach((knob) => {
      const value = knobValues ? knobValues[knob] || 0 : 50;
      knobsArray.push(this.fb.group({ name: knob, value: [value] }));
    });
  }

  removePedal(index: number) {
    this.pedalControls.removeAt(index);
  }
  submit() {
    if (this.form.valid) {
      const { _id, ...pedalboardData } = this.form.value;
      const mappedPedals: PedalBoardPedal[] = pedalboardData.pedals.map(
        ({ knobs, ...pedal }, index) => {
          const knobValues: PedalboardKnobValues = {};
          knobs.forEach((knob) => {
            knobValues[knob.name] = knob.value;
          });
          return {
            ...pedal,
            knobValues,
          } as PedalBoardPedal;
        }
      );

      const mappedData = { ...pedalboardData, pedals: mappedPedals };

      const call = _id
        ? this.pedalBoardService.updatePedalBoard(_id, mappedData as PedalBoard)
        : this.pedalBoardService
            .createPedalBoard(mappedData as CreatePedalBoardRequest)
            .pipe(tap(() => this.clearForm()));

      call.subscribe((res) => {
        this.save.emit();
        console.log('Pedalboard Saved:', res);
      });
    }
  }
  deletePedalboard(id: string) {
    this.pedalBoardService
      .deletePedalBoard(id)
      .subscribe(() => this.delete.emit(id));
  }

  private clearForm() {
    this.form.reset();
    this.pedalControls.clear();
  }
}
