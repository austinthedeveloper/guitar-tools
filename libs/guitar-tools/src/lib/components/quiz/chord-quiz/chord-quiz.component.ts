import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ChordInterface } from '@guitar/interfaces';
import { uniq } from 'lodash-es';

import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
  selector: 'guitar-chord-quiz',
  templateUrl: './chord-quiz.component.html',
  styleUrls: ['./chord-quiz.component.css'],
})
export class ChordQuizComponent
  extends ChordQuizBaseComponent
  implements OnChanges
{
  @Input() chords: ChordInterface[] = [];
  chord!: ChordInterface;
  options: string[] = [];

  constructor(public fb: UntypedFormBuilder) {
    super(fb);
  }
  ngOnChanges({ chords }: SimpleChanges): void {
    if (chords && this.chords.length) {
      this.setOptions();
      this.setAnswer();
    }
  }

  private setOptions() {
    this.options = uniq(this.chords.map((chord) => chord.name));
  }

  setAnswer() {
    this.chord =
      this.chords[Math.floor(Math.random() * (this.chords.length - 1))];

    this.answer.patchValue(this.chord.name);
  }
}
