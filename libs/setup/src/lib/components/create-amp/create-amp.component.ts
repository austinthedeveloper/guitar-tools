import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  Amp,
  AmpControl,
  AmpInputControls,
  CreateAmpRequest,
} from '@guitar/interfaces';

import { AMP_INPUTS, AMP_KNOBS } from '../../helpers';
import { AmpService } from './../../services';
import { AmpControlsGroup } from '../../interfaces';

@Component({
  selector: 'lib-create-amp',
  templateUrl: './create-amp.component.html',
  styleUrl: './create-amp.component.scss',
})
export class CreateAmpComponent {
  @Input() disabled!: boolean;
  @Input() amp!: Amp;
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter<string>();

  ampForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    brand: [''],
    controls: this.fb.array<FormGroup<AmpControlsGroup>>([]),
  });
  controlOptions = [...AMP_INPUTS, ...AMP_KNOBS];
  controlTypes = AmpInputControls;

  constructor(
    private fb: NonNullableFormBuilder,
    private ampService: AmpService
  ) {}
  ngOnChanges({ amp }: SimpleChanges) {
    if (amp) {
      this.clearForm();
      this.ampForm.patchValue({
        _id: this.amp._id,
        name: this.amp.name,
        brand: this.amp.brand,
      });
      this.amp.controls.forEach((control) => {
        const value = this.controls.value.find((c) => c.name === control.name);
        this.addControlExisting(control, value as Required<AmpControl>);
      });
    }
  }

  get controls() {
    return this.ampForm.controls.controls;
  }

  getControl(i: number) {
    return this.controls.controls[i];
  }

  addControl(name = '', type = 'input') {
    const index = this.controls.length;
    this.controls.push(
      this.fb.group({
        name: [name, Validators.required],
        value: [50],
        type: [type, Validators.required],
        order: [index],
        values: this.fb.array([]),
      })
    );
  }
  addControlExisting(ampControl: AmpControl, value?: AmpControl) {
    const index = this.controls.length;
    const group = this.fb.group({
      name: ['', Validators.required],
      value: [50],
      type: ['input', Validators.required],
      order: [index],
      values: this.fb.array([]),
    });
    group.patchValue(ampControl);
    if (value) {
      group.patchValue(value);
    }

    this.controls.push(group);
  }

  removeControl(index: number) {
    this.controls.removeAt(index);
  }

  onControlChange(formGroup: FormGroup<AmpControlsGroup>) {
    const name = formGroup.controls['name'].value;
    const type = this.controlOptions.find((option) => option.name === name);
    formGroup.controls['type'].patchValue(type.type);
  }

  submit() {
    if (this.ampForm.valid) {
      const { _id, ...formData } = this.ampForm.value;
      const controls = this.mapControls(formData.controls as AmpControl[]);
      const mappedData: CreateAmpRequest = {
        name: formData.name,
        brand: formData.brand,
        controls,
      };
      this.save.emit(mappedData);

      const call = _id
        ? this.ampService.updateAmp(_id, mappedData as Amp)
        : this.ampService.createAmp(mappedData);

      call.subscribe((res) => {
        console.log('Amp Created:', res);
        this.clearForm();
      });
    }
  }

  private clearForm() {
    this.ampForm.reset();
    this.controls.clear();
    this.addControl('Input 1', 'input');
  }

  private mapControls(controls: AmpControl[]) {
    return controls.map((control, i) => ({
      ...control,
      order: i,
    }));
  }
}
