import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'guitar-quiz-totals',
  templateUrl: './quiz-totals.component.html',
  styleUrls: ['./quiz-totals.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizTotalsComponent {
  @Input() correct: number;
  @Input() incorrect: number;

  get total() {
    return this.correct + '/' + (this.correct + this.incorrect);
  }
}
