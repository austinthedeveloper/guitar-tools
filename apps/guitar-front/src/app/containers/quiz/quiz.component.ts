import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CHORDS_MOCK_SORTED } from '@guitar/data';
import { ChordInterface, UserOptionsInterface } from '@guitar/interfaces';
import { OptionsService } from '@guitar/store';
import { random, shuffle } from 'lodash-es';
import { Observable } from 'rxjs';

const quizItems = [
  { key: 'Sorting Modes', value: 'sorting' },
  { key: 'Relative Minor', value: 'relativeMinor' },
  { key: 'Mode', value: 'modeName' },
  { key: 'Mode', value: 'mode' },
  // { key: 'Guess Chord', value: 'chord' },
];
@Component({
  selector: 'guitar-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  chords: ChordInterface[] = CHORDS_MOCK_SORTED;
  options$: Observable<UserOptionsInterface> = this.userOptions.options$;
  tuning$ = this.userOptions.tuning$;
  tuningChart$ = this.userOptions.tuningChart$;
  frets$ = this.userOptions.frets$;

  form = this.fb.group({
    activeType: this.fb.control('', Validators.required),
    activeValue: this.fb.control('', Validators.required),
    correct: 0,
    incorrect: 0,
    total: 0,
  });

  constructor(private fb: FormBuilder, private userOptions: OptionsService) {}

  ngOnInit() {
    this.randomizeQuiz();
  }

  private randomizeQuiz() {
    const original = this.form.value;
    const rand = random(quizItems.length - 1);
    const selected = quizItems[rand];
    console.log('hit', selected);

    if (original.activeValue === selected.value) {
      this.randomizeQuiz();
    } else {
      this.form.patchValue({
        activeType: selected.key,
        activeValue: selected.value,
      });
    }
  }

  get activeType() {
    return this.form.get('activeType') as FormControl;
  }

  get activeValue() {
    return this.form.get('activeValue') as FormControl;
  }

  get correct() {
    return this.form.get('correct') as FormControl;
  }

  get incorrect() {
    return this.form.get('incorrect') as FormControl;
  }

  onCorrect() {
    this.correct.patchValue(this.correct.value + 1);
    this.randomizeQuiz();
  }
  onIncorrect() {
    this.incorrect.patchValue(this.incorrect.value + 1);
  }
}
