import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
  selector: 'guitar-fretboard-quiz',
  templateUrl: './fretboard-quiz.component.html',
  styleUrls: ['./fretboard-quiz.component.css'],
})
export class FretboardQuizComponent
  extends ChordQuizBaseComponent
  implements OnChanges
{
  constructor(public fb: FormBuilder) {
    super(fb);
  }
  ngOnChanges({}: SimpleChanges): void {}
}
