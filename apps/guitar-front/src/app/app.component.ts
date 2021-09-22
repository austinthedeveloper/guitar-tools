import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
    presses: this.fb.control([])
  })
  constructor(private fb: FormBuilder) {
    this.form.patchValue({presses: this.presses})
  }

  onPressChange($event: any) {
    this.form.get('presses')?.patchValue($event)
  }
}
