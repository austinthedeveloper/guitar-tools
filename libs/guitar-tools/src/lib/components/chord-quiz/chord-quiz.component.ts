import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChordInterface } from '@guitar/interfaces';

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

  constructor(public fb: FormBuilder) {
    super(fb);
  }
  ngOnChanges({ chords }: SimpleChanges): void {
    if (chords && this.chords.length) {
      this.setAnswer();
    }
  }
  setAnswer() {
    const match: ChordInterface =
      this.chords[Math.floor(Math.random() * (this.chords.length - 1))];
    this.chord = match;
    this.form.patchValue({
      answer: match.fullName,
      guess: null,
      total: this.form.value.total + 1,
    });
  }
}
