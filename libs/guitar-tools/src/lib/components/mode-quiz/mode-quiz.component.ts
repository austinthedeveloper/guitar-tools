import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SCALE, TuningHelper } from '@guitar/helpers';
import { TuningChart, PressInterface, ModesEnum } from '@guitar/interfaces';
import { random } from 'lodash-es';
import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
  selector: 'guitar-mode-quiz',
  templateUrl: './mode-quiz.component.html',
  styleUrls: ['./mode-quiz.component.css'],
})
export class ModeQuizComponent extends ChordQuizBaseComponent {
  modeForm = this.fb.group({
    scale: [null, Validators.required],
    mode: [null, Validators.required],
  });
  private scaleOptions = SCALE;
  options = [
    'Ionian',
    'Dorian',
    'Phrygian',
    'Lydian',
    'Mixolydian',
    'Aeolian',
    'Locrian',
  ];

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
      mode: scale[randomMode],
    });

    this.answer.patchValue(ModesEnum[randomMode]);
  }

  submit() {
    this.submitAnswer();
  }
}
