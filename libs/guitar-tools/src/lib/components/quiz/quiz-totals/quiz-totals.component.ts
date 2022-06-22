import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'guitar-quiz-totals',
  templateUrl: './quiz-totals.component.html',
  styleUrls: ['./quiz-totals.component.css'],
})
export class QuizTotalsComponent implements OnInit {
  @Input() correct: number;
  @Input() incorrect: number;
  constructor() {}

  ngOnInit() {
    if (!this.correct || !this.incorrect) {
      console.error('Please add the missing totals');
    }
  }

  get total() {
    return this.correct + '/' + (this.correct + this.incorrect);
  }
}
