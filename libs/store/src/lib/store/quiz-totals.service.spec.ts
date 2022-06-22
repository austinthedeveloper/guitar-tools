import { TestBed } from '@angular/core/testing';

import { QuizTotalsService } from './quiz-totals.service';

describe('QuizTotalsService', () => {
  let service: QuizTotalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizTotalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
