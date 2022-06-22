import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  CHORDS_MOCK_SORTED,
  QUIZ_TYPES,
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
})
export class QuizComponent implements OnInit {
  chords: ChordInterface[] = CHORDS_MOCK_SORTED;
  triads: ChordInterface[] = TRIADS_MOCK_SORTED;
  triadsMinor: ChordInterface[] = TRIADS_MOCK_MINOR_SORTED;

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
    return this.form.get('activeType') as UntypedFormControl;
  }

  get activeValue() {
    return this.form.get('activeValue') as UntypedFormControl;
  }

  get correct() {
    return this.form.get('correct') as UntypedFormControl;
  }

  get incorrect() {
    return this.form.get('incorrect') as UntypedFormControl;
  }

  get activeQuizzes() {
    return this.form.get('activeQuizzes') as UntypedFormControl;
  }

  get activeQuizValues() {
    const formValue: string[] = this.activeQuizzes.value;
    return this.quizItems.filter((item) => formValue.includes(item.value));
  }

  onCorrect() {
    this.correct.patchValue(this.correct.value + 1);
    this.randomizeQuiz();
  }
  onIncorrect() {
    this.incorrect.patchValue(this.incorrect.value + 1);
  }
}
