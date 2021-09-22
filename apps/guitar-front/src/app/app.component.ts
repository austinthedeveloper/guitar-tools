import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {CHORDS_MOCK} from '@guitar/data'
@Component({
  selector: 'guitar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'guitar-front';
  presses: any[] = [
  {
    fret: '1',
    string: '5',
  }
  ]
  form = this.fb.group({
    presses: this.fb.control([]),
    id: this.fb.control(''),
  });
  chords = CHORDS_MOCK;
  constructor(private fb: FormBuilder) {
    this.form.patchValue({presses: this.presses});
    this.formId.valueChanges.subscribe(id => {
      this.formPress.patchValue(this.chords.find(chord => chord.id === id)?.presses)
    })
  }

  onPressChange($event: any) {
    this.formPress.patchValue($event)
  }

  get formPress(): FormControl {
    return this.form.get('presses') as FormControl;
  }

  get formId(): FormControl {
    return this.form.get('id') as FormControl;
  }
}
