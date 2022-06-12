import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'guitar-quiz-totals',
  templateUrl: './quiz-totals.component.html',
  styleUrls: ['./quiz-totals.component.css'],
})
export class QuizTotalsComponent implements OnInit {
  @Input() totals: {
    correct: number;
    incorrect: number;
    total: number;
  };

  constructor() {}

  ngOnInit() {
    if (!this.totals) {
      console.error('Please add the missing totals');
    }
  }
}
