import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
    const { answer, guess, correct, incorrect, total } = this.form.value;
    const base = { total: total + 1 };
    if (guess === answer) {
      this.form.patchValue({ ...base, guess: null, correct: correct + 1 });
      this.setAnswer();
    } else {
      this.form.patchValue({
        ...base,
        incorrect: incorrect + 1,
      });
    }
  }

  reset() {
    this.form.reset({ correct: 0, incorrect: 0, total: 0 });
    this.setAnswer();
  }

  get answer(): FormControl {
    return this.form.get('answer') as FormControl;
  }

  get guess(): FormControl {
    return this.form.get('guess') as FormControl;
  }
}
