import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
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
    scale: this.fb.control(null, [Validators.required]),
    mode: this.fb.control(null, [Validators.required]),
  });
  scaleOptions = SCALE;
  modeOptions = MODES_ARRAY;

  constructor(fb: UntypedFormBuilder) {
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

  submit(value: string) {
    this.guess.patchValue(value);
    this.submitAnswer();
  }
}
