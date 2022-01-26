import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { DrumUserOptions } from '../../interfaces';
import { DrumKeyService } from '../../services';

@Component({
  selector: 'guitar-drum-form-config',
  templateUrl: './drum-form-config.component.html',
  styleUrls: ['./drum-form-config.component.css'],
})
export class DrumFormConfigComponent implements OnInit {
  form: FormGroup;
  config$ = this.drumKeyService.userOptions$.pipe(
    first(),
    tap((options) => this.buildForm(options))
  );

  constructor(
    private drumKeyService: DrumKeyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

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
    this.form = this.fb.group({
      timelines: this.fb.control(10000, Validators.required),
      maps: this.fb.group(mappedControls),
    });
    this.form.patchValue(form);
  }
}
