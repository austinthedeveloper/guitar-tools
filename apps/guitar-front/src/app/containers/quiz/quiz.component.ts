import { Component, OnInit } from '@angular/core';
import {
  CHORDS_MOCK_SORTED,
  QUIZ_TYPES,
  TRIADS_MOCK_AUGMENTED_SORTED,
  TRIADS_MOCK_DIMINISHED_SORTED,
  TRIADS_MOCK_MINOR_SORTED,
  TRIADS_MOCK_SORTED,
} from '@guitar/data';
import { ChordInterface, UserOptionsInterface } from '@guitar/interfaces';
import { OptionsService, QuizTotalsService } from '@guitar/store';
import { random } from 'lodash-es';
import { Observable } from 'rxjs';

@Component({
    selector: 'guitar-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css'],
    standalone: false
})
export class QuizComponent implements OnInit {
  chords: ChordInterface[] = CHORDS_MOCK_SORTED;
  triads: ChordInterface[] = TRIADS_MOCK_SORTED;
  triadsMinor: ChordInterface[] = TRIADS_MOCK_MINOR_SORTED;
  triadsAugmented: ChordInterface[] = TRIADS_MOCK_AUGMENTED_SORTED;
  triadsDiminished: ChordInterface[] = TRIADS_MOCK_DIMINISHED_SORTED;

  options$: Observable<UserOptionsInterface> = this.userOptions.options$;
  tuning$ = this.userOptions.tuning$;
  tuningChart$ = this.userOptions.tuningChart$;
  frets$ = this.userOptions.frets$;

  quizItems = QUIZ_TYPES;

  form = this.quizTotalsService.form;

  constructor(
    private quizTotalsService: QuizTotalsService,
    private userOptions: OptionsService
  ) {}

  ngOnInit() {
    this.randomizeQuiz();
  }

  randomizeQuiz() {
    if (!this.activeQuizValues.length) {
      return;
    }

    const original = this.form.value;
    const rand = random(this.activeQuizValues.length - 1);
    const selected = this.activeQuizValues[rand];

    if (
      original.activeValue === selected.value &&
      this.activeQuizValues.length > 1
    ) {
      this.randomizeQuiz();
    } else {
      this.form.patchValue({
        activeType: selected.key,
        activeValue: selected.value,
      });
    }
  }

  get activeType() {
    return this.form.controls.activeType;
  }

  get activeValue() {
    return this.form.controls.activeValue;
  }

  get correct() {
    return this.form.controls.correct;
  }

  get incorrect() {
    return this.form.controls.incorrect;
  }

  get activeQuizzes() {
    return this.form.controls.activeQuizzes;
  }

  get activeQuizValues() {
    const formValue: string[] = this.activeQuizzes.value;
    return this.quizItems.filter((item) => formValue.includes(item.value));
  }

  onCorrect() {
    this.quizTotalsService.onCorrect();
    this.randomizeQuiz();
  }

  onIncorrect() {
    this.quizTotalsService.onIncorrect();
  }

  onReset() {
    this.quizTotalsService.onReset();
  }

  onClear() {
    this.quizTotalsService.onClear();
  }
}
