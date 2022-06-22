import { Injectable } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QuizTotalsService {
  form = this.fb.group({
    activeType: this.fb.control('', Validators.required),
    activeValue: this.fb.control('', Validators.required),
    activeQuizzes: this.fb.control(
      [
        'relativeMinor',
        'modeName',
        'mode',
        'triads',
        'triadsMinor',
        'specificTriads',
      ],
      Validators.required
    ),
    correct: 0,
    incorrect: 0,
  });

  constructor(private fb: UntypedFormBuilder) {}
}
