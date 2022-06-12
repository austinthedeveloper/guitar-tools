import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SCALE, TuningHelper } from '@guitar/helpers';
import { ModesEnum, MODES_ARRAY } from '@guitar/interfaces';
import { random } from 'lodash-es';

import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
  selector: 'guitar-mode-name-quiz',
  templateUrl: './mode-name-quiz.component.html',
  styleUrls: ['./mode-name-quiz.component.css'],
})
export class ModeNameQuizComponent extends ChordQuizBaseComponent {
  modeForm = this.fb.group({
    scale: [null, Validators.required],
    mode: [null, Validators.required],
  });
  scaleOptions = SCALE;
  modeOptions = MODES_ARRAY;

  constructor(fb: FormBuilder) {
    super(fb);
    this.setAnswer();
  }

  setAnswer(): void {
    const randomScale = random(this.scaleOptions.length - 1);
    const scale = TuningHelper.getScaleByKeyAndType(
      this.scaleOptions[randomScale],
      'major'
    );

    const randomMode = random(scale.length - 1);

    this.modeForm.patchValue({
      scale: this.scaleOptions[randomScale],
      mode: ModesEnum[randomMode],
    });

    this.answer.patchValue(scale[randomMode]);
  }

  submit() {
    this.submitAnswer();
  }
}