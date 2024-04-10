import { Component, OnChanges, SimpleChanges } from '@angular/core';
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
  ngOnChanges({}: SimpleChanges): void {}
}
