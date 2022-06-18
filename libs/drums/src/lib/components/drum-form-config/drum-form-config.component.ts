import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter, first, tap } from 'rxjs/operators';

import { DrumUserOptions } from '../../interfaces';
import { DrumKeyService } from '../../services';

@Component({
  selector: 'guitar-drum-form-config',
  templateUrl: './drum-form-config.component.html',
  styleUrls: ['./drum-form-config.component.css'],
})
export class DrumFormConfigComponent implements OnDestroy {
  form: UntypedFormGroup;
  config$ = this.drumKeyService.userOptions$.pipe(
    first(),
    tap((options) => this.buildForm(options))
  );
  configArray: string[] = [];
  private formSub: Subscription;

  constructor(
    private drumKeyService: DrumKeyService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  private assignMaps(maps: string[]) {
    return maps.reduce((prev, key) => {
      return {
        ...prev,
        [key]: this.fb.control(key, Validators.required),
      };
    }, {});
  }

  private buildForm(form: DrumUserOptions) {
    const mappedKeys = Object.keys(form.maps);
    const mappedControls = this.assignMaps(mappedKeys);
    this.configArray = mappedKeys;
    this.form = this.fb.group({
      timelines: this.fb.control(10000, [
        Validators.required,
        Validators.min(1),
      ]),
      maps: this.fb.group(mappedControls),
    });
    this.form.patchValue(form);
    this.setFormSub();
  }

  private setFormSub() {
    this.formSub = this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        debounceTime(1000),
        tap((form: DrumUserOptions) =>
          this.drumKeyService.updateUserOptions(form)
        )
      )
      .subscribe();
  }

  getMapControls(key: string): UntypedFormControl {
    return (this.form.get('maps') as UntypedFormGroup).get(key) as UntypedFormControl;
  }

  get timelines(): UntypedFormControl {
    return this.form.get('timelines') as UntypedFormControl;
  }
}
