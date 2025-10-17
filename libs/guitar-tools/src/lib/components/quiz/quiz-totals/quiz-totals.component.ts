import { Component, Input } from '@angular/core';

@Component({
    selector: 'guitar-quiz-totals',
    templateUrl: './quiz-totals.component.html',
    styleUrls: ['./quiz-totals.component.css'],
    standalone: false
})
export class QuizTotalsComponent {
  @Input() correct: number;
  @Input() incorrect: number;

  get total() {
    return this.correct + '/' + (this.correct + this.incorrect);
  }
}
