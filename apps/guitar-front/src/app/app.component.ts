import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {CHORDS_MOCK_SORTED} from '@guitar/data'
@Component({
  selector: 'guitar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'guitar-front';
  presses: any[] = [
  {
    "fret": "3",
    "string": "1"
  },
  {
    "fret": "3",
    "string": "2"
  },
  {
    "fret": "3",
    "string": "6"
  },
  {
    "fret": "4",
    "string": "3"
  },
  {
    "fret": "5",
    "string": "4"
  },
  {
    "fret": "5",
    "string": "5"
  }
]
  form = this.fb.group({
    presses: this.fb.control([]),
    id: this.fb.control(''),
  });
  chords = CHORDS_MOCK_SORTED;
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
