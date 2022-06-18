import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MODES_ARRAY } from '@guitar/interfaces';
import { isEqual, shuffle } from 'lodash-es';

@Component({
  selector: 'guitar-mode-ordering-quiz',
  templateUrl: './mode-ordering-quiz.component.html',
  styleUrls: ['./mode-ordering-quiz.component.css'],
})
export class ModeOrderingQuizComponent extends ChordQuizBaseComponent {
  private answers = MODES_ARRAY;

  constructor(fb: UntypedFormBuilder) {
    super(fb);
    this.setAnswer();
  }

  setAnswer() {
    this.answer.patchValue([...this.answers]);
    this.guess.patchValue(shuffle([...this.answers]));
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
    this.submitAnswer((guess: string[], answer: string[]) =>
      isEqual(guess, answer)
    );
  }
}
