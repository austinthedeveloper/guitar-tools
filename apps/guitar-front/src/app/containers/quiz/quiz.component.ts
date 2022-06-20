import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import {
  CHORDS_MOCK_SORTED,
  TRIADS_MOCK_MINOR_SORTED,
  TRIADS_MOCK_SORTED,
} from '@guitar/data';
import { ChordInterface, UserOptionsInterface } from '@guitar/interfaces';
import { OptionsService } from '@guitar/store';
import { random } from 'lodash-es';
import { Observable } from 'rxjs';

const quizItems = [
  { key: 'Sorting Modes', value: 'sorting' },
  { key: 'Relative Minor', value: 'relativeMinor' },
  { key: 'Relative Major', value: 'relativeMajor' },
  { key: 'Mode Note', value: 'modeName' },
  { key: 'Mode Name', value: 'mode' },
  { key: 'Guess Chord', value: 'chord' },
  { key: 'Guess Triad', value: 'triads' },
  { key: 'Guess Minor Triad', value: 'triadsMinor' },
  { key: 'Triads on a Specific Note', value: 'specificTriads' },
  { key: 'Scale', value: 'scale' },
];
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

  quizItems = quizItems;

  form = this.fb.group({
    activeType: this.fb.control('', Validators.required),
    activeValue: this.fb.control('', Validators.required),
    activeQuizzes: this.fb.control(
      [
        'relativeMinor',
        'modeName',
        'mode',
        'triads',
        'triadsMinor',
        'specificTriads',
      ],
      Validators.required
    ),
    correct: 0,
    incorrect: 0,
    total: 0,
  });

  constructor(
    private fb: UntypedFormBuilder,
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

  get total() {
    return this.form.get('total') as UntypedFormControl;
  }

  get activeQuizzes() {
    return this.form.get('activeQuizzes') as UntypedFormControl;
  }

  get activeQuizValues() {
    const formValue: string[] = this.activeQuizzes.value;
    return quizItems.filter((item) => formValue.includes(item.value));
  }

  onCorrect() {
    this.correct.patchValue(this.correct.value + 1);
    this.updateTotal();
    this.randomizeQuiz();
  }
  onIncorrect() {
    this.incorrect.patchValue(this.incorrect.value + 1);
    this.updateTotal();
  }

  updateTotal() {
    this.total.patchValue(this.total.value + 1);
  }
}
