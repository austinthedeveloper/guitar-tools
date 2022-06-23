import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { CHORDS_MOCK_SORTED } from '@guitar/data';
import { SCALE, TuningHelper } from '@guitar/helpers';
import { ChordInterface, UserOptionsInterface } from '@guitar/interfaces';
import { OptionsService } from '@guitar/store';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'guitar-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  presses: any[] = [];
  form = this.fb.group({
    presses: this.fb.control([]),
    id: this.fb.control(''),
  });
  chords: ChordInterface[] = CHORDS_MOCK_SORTED;
  options$: Observable<UserOptionsInterface> = this.userOptions.options$;
  tuning$ = this.userOptions.tuning$;
  tuningChart$ = this.userOptions.tuningChart$;
  frets$ = this.userOptions.frets$;

  exampleScaleForm = this.fb.group({
    key: ['A', Validators.required],
    scale: ['major', Validators.required],
  });
  scaleOptions = SCALE;
  scaleTypeOptions = TuningHelper.getScaleOptions;
  exampleTab$ = combineLatest([
    this.tuningChart$,
    this.exampleScaleForm.valueChanges.pipe(
      startWith(this.exampleScaleForm.value)
    ),
  ]).pipe(
    map(([tuningChart, scaleForm]) => {
      const tuning = TuningHelper.getScaleByKeyAndType(
        scaleForm.key,
        scaleForm.scale
      );

      return TuningHelper.buildNotes(tuning, tuningChart);
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

  get formPress(): FormControl {
    return this.form.controls.presses;
  }

  get formId(): FormControl {
    return this.form.controls.id;
  }
}
