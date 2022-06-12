import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'guitar-quiz-base',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChordQuizBaseComponent {
  @Input() hideTotals: boolean = false;
  @Output() correct: EventEmitter<any> = new EventEmitter();
  @Output() incorrect: EventEmitter<any> = new EventEmitter();
  @Output() afterAnswer: EventEmitter<any> = new EventEmitter();
  @Output() afterReset: EventEmitter<any> = new EventEmitter();
  form = this.fb.group({
    correct: 0,
    incorrect: 0,
    total: 0,
    answer: [null, [Validators.required]],
    guess: [null, [Validators.required]],
  });

  constructor(public fb: FormBuilder) {}

  setAnswer(): void {}
  submitAnswer(callback?: Function) {
    const { answer, guess } = this.form.value;
    const isCorrect = callback ? callback(guess, answer) : guess === answer;
    if (isCorrect) {
      this.isCorrect();
    } else {
      this.isWrong();
    }

    this.onAfterAnswer();
  }

  reset() {
    this.form.reset({ correct: 0, incorrect: 0, total: 0 });
    this.afterReset.emit(this.form.value);
    this.setAnswer();
  }

  isCorrect() {
    const { correct, total } = this.form.value;
    const base = { total: total + 1 };
    this.correct.emit(this.form.value);
    this.form.patchValue({ ...base, guess: null, correct: correct + 1 });
    this.setAnswer();
  }

  isWrong() {
    const { incorrect, total } = this.form.value;
    const base = { total: total + 1 };
    this.incorrect.emit(this.form.value);
    this.form.patchValue({
      ...base,
      incorrect: incorrect + 1,
    });
  }

  onAfterAnswer() {
    this.afterAnswer.emit(this.form.value);
  }

  get answer(): FormControl {
    return this.form.get('answer') as FormControl;
  }

  get guess(): FormControl {
    return this.form.get('guess') as FormControl;
  }
}
