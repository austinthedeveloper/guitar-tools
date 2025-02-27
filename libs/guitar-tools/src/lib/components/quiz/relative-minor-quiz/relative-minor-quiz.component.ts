import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { relativeMinorArray, relativeMinorValues } from '@guitar/helpers';
import { random } from 'lodash-es';

import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
    selector: 'guitar-relative-minor-quiz',
    templateUrl: './relative-minor-quiz.component.html',
    styleUrls: ['./relative-minor-quiz.component.css'],
    standalone: false
})
export class RelativeMinorQuizComponent extends ChordQuizBaseComponent {
  minorForm = this.fb.control('', Validators.required);
  minorValues = relativeMinorValues;
  private minorArray = relativeMinorArray;

  constructor() {
    super();
    this.setAnswer();
  }

  setAnswer(): void {
    const randomScale = random(this.minorArray.length - 1);
    const scale = this.minorArray[randomScale];
    this.minorForm.patchValue(scale[0]);
    this.answer.patchValue(scale[1]);
    this.markStart();
  }

  submit(value: string) {
    this.guess.patchValue(value);
    this.submitAnswer();
  }
}
