import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CHORDS_MOCK_SORTED } from '@guitar/data';
import { UserOptionsInterface } from '@guitar/interfaces';
import { OptionsService } from '@guitar/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  frets$ = this.userOptions.frets$;

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
