import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QuizTotalsService {
  form = this.fb.group({
    activeType: this.fb.control('', Validators.required),
    activeValue: this.fb.control('', Validators.required),
    activeQuizzes: this.fb.control(
      [
        'triadsNoteOrder',
        // 'relativeMinor',
        // 'modeName',
        // 'mode',
        // 'triads',
        // 'triadsMinor',
        // 'specificTriads',
        // 'scale',
      ],
      Validators.required
    ),
    correct: 0,
    incorrect: 0,
  });

  constructor(private fb: FormBuilder) {}

  get correct() {
    return this.form.controls.correct;
  }

  get incorrect() {
    return this.form.controls.incorrect;
  }

  onCorrect() {
    this.correct.patchValue(this.correct.value + 1);
  }

  onIncorrect() {
    this.incorrect.patchValue(this.incorrect.value + 1);
  }

  onReset() {
    this.form.patchValue({ correct: 0, incorrect: 0 });
  }
}
