import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'guitar-quiz-base',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChordQuizBaseComponent {
  form = this.fb.group({
    correct: 0,
    incorrect: 0,
    total: 0,
    answer: [null, [Validators.required]],
    guess: [null, [Validators.required]],
  });

  constructor(public fb: FormBuilder) {}
  setAnswer(): void {}
  submitAnswer() {
    const { answer, guess, correct, incorrect } = this.form.value;
    if (guess === answer) {
      this.form.patchValue({ guess: null, correct: correct + 1 });
      this.setAnswer();
    } else {
      this.form.patchValue({ incorrect: incorrect + 1 });
    }
  }

  reset() {
    this.form.reset({ correct: 0, incorrect: 0, total: 0 });
    this.setAnswer();
  }
}
