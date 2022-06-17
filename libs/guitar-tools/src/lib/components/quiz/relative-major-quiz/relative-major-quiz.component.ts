import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { relativeMajorValues, relativeMajorArray } from '@guitar/helpers';
import { random } from 'lodash-es';
import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
  selector: 'guitar-relative-major-quiz',
  templateUrl: './relative-major-quiz.component.html',
  styleUrls: ['./relative-major-quiz.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelativeMajorQuizComponent extends ChordQuizBaseComponent {
  majorForm = this.fb.control('', Validators.required);
  majorValues = relativeMajorValues;
  private majorArray = relativeMajorArray;

  constructor(fb: FormBuilder) {
    super(fb);
    this.setAnswer();
  }

  setAnswer(): void {
    const randomScale = random(this.majorArray.length - 1);
    const scale = this.majorArray[randomScale];
    this.majorForm.patchValue(scale[0]);
    this.answer.patchValue(scale[1]);
  }

  submit() {
    this.submitAnswer();
  }
}