import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

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

  fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  form = this.fb.group({
    correct: this.fb.control(0),
    incorrect: this.fb.control(0),
    total: this.fb.control(0),
    answer: this.fb.control(null, [Validators.required]),
    guess: this.fb.control(null, [Validators.required]),
    startTime: this.fb.control(''),
    endTime: this.fb.control(''),
  });

  constructor() {
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
    this.markEnd();
    const { correct } = this.form.value;
    this.incrementTotal();
    this.correct.emit(this.form.value);
    this.form.patchValue({ guess: null, correct: correct + 1 });
    this.setAnswer();
  }

  isWrong() {
    const { incorrect } = this.form.value;
    this.incrementTotal();
    this.incorrect.emit(this.form.value);
    this.form.patchValue({
      incorrect: incorrect + 1,
    });
  }

  onAfterAnswer() {
    this.afterAnswer.emit(this.form.value);
  }

  markStart() {
    this.form.controls.startTime.patchValue(new Date().toISOString());
  }

  markEnd() {
    this.form.controls.endTime.patchValue(new Date().toISOString());
  }

  calculateDuration() {
    const { startTime, endTime } = this.form.value;
    var eventStartTime = new Date(startTime);
    var eventEndTime = new Date(endTime);
    var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
    return new Date(duration);
  }

  private incrementTotal() {
    const { total } = this.form.value;
    const value = { total: total + 1 };
    this.form.patchValue(value);
  }

  get answer() {
    return this.form.controls.answer;
  }

  get guess() {
    return this.form.controls.guess;
  }
}
