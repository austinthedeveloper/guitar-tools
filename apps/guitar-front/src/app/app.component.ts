import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CHORDS_MOCK_SORTED } from '@guitar/data';
import { FretDotsHelper, SCALE, TuningHelper } from '@guitar/helpers';
import { UserOptionsInterface } from '@guitar/interfaces';
import { OptionsService } from '@guitar/store';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'guitar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'guitar-front';
  presses: any[] = [];
  form = this.fb.group({
    presses: this.fb.control([]),
    id: this.fb.control(''),
  });
  chords = CHORDS_MOCK_SORTED;
  options$: Observable<UserOptionsInterface> = this.userOptions.options$;
  tuning$ = this.userOptions.tuning$;
  tuningChart$ = this.userOptions.tuningChart$;
  frets$ = this.userOptions.frets$;

  exampleScaleForm = this.fb.group({
    key: ['A', Validators.required],
    scale: ['major', Validators.required],
  });
  scaleOptions = SCALE;
  exampleTab$ = combineLatest([
    this.tuningChart$,
    this.exampleScaleForm.valueChanges.pipe(
      startWith(this.exampleScaleForm.value)
    ),
  ]).pipe(
    map(([tuningChart, scaleForm]) => {
      const test = TuningHelper.getMajorPentatonic(scaleForm.key);
      return TuningHelper.buildNotes(test, tuningChart);
    })
  );

  constructor(private fb: FormBuilder, private userOptions: OptionsService) {
    this.form.patchValue({ presses: this.presses });
    this.formId.valueChanges.subscribe((id) => {
      this.formPress.patchValue(
        this.chords.find((chord) => chord.id === id)?.presses
      );
    });
  }

  onPressChange($event: any) {
    this.formPress.patchValue($event);
  }

  optionChanged(options: UserOptionsInterface) {
    this.userOptions.setOption(options);
  }

  get formPress(): FormControl {
    return this.form.get('presses') as FormControl;
  }

  get formId(): FormControl {
    return this.form.get('id') as FormControl;
  }
}
