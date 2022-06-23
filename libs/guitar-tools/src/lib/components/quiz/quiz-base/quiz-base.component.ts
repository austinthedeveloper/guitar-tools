import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'guitar-quiz-base',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChordQuizBaseComponent {
  @Input() hideTotals: boolean = true;
  callback: Function = (guess: any, answer: any) => guess === answer;
  @Output() formReady: EventEmitter<any> = new EventEmitter();
  @Output() correct: EventEmitter<any> = new EventEmitter();
  @Output() incorrect: EventEmitter<any> = new EventEmitter();
  @Output() afterAnswer: EventEmitter<any> = new EventEmitter();
  @Output() afterReset: EventEmitter<any> = new EventEmitter();
  form = this.fb.group({
    correct: this.fb.control(0),
    incorrect: this.fb.control(0),
    total: this.fb.control(0),
    answer: this.fb.control(null, [Validators.required]),
    guess: this.fb.control(null, [Validators.required]),
  });

  constructor(public fb: FormBuilder) {
    this.formReady.emit(this.form);
  }

  setAnswer(): void {}
  submitAnswer() {
    const { answer, guess } = this.form.value;
    const isCorrect = this.callback(guess, answer);
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

  get answer() {
    return this.form.controls.answer;
  }

  get guess() {
    return this.form.controls.guess;
  }
}
