import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MODES_ARRAY } from '@guitar/interfaces';
import { isEqual, shuffle } from 'lodash-es';

import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
    selector: 'guitar-mode-ordering-quiz',
    templateUrl: './mode-ordering-quiz.component.html',
    styleUrls: ['./mode-ordering-quiz.component.css'],
    standalone: false
})
export class ModeOrderingQuizComponent extends ChordQuizBaseComponent {
  private answers = MODES_ARRAY;
  callback = (guess: string[], answer: string[]) => isEqual(guess, answer);

  constructor() {
    super();
    this.setAnswer();
  }

  setAnswer() {
    this.answer.patchValue([...this.answers]);
    this.guess.patchValue(shuffle([...this.answers]));
    this.markStart();
  }

  drop(changedItem: CdkDragDrop<string[]>, guess: string[]) {
    moveItemInArray(guess, changedItem.previousIndex, changedItem.currentIndex);
  }

  /**
   * This submit uses a callback function to compare arrays
   *
   * @memberof ModeOrderingQuizComponent
   */
  submit() {
    this.submitAnswer();
  }
}
