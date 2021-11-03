import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChordInterface } from '@guitar/interfaces';
import { Subject } from 'rxjs';

@Component({
  selector: 'guitar-chord-quiz',
  templateUrl: './chord-quiz.component.html',
  styleUrls: ['./chord-quiz.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChordQuizComponent implements OnChanges {
  @Input() chords: ChordInterface[] = [];
  form = this.fb.group({
    correct: 0,
    incorrect: 0,
    total: 0,
    answer: [null, [Validators.required]],
    guess: [null, [Validators.required]],
  });
  private sub: Subject<ChordInterface> = new Subject();
  currentChord$ = this.sub.asObservable();
  chord!: ChordInterface;

  constructor(private fb: FormBuilder) {}
  ngOnChanges({ chords }: SimpleChanges): void {
    if (chords && this.chords.length) {
      this.setAnswer();
    }
  }
  private setAnswer() {
    const match: ChordInterface =
      this.chords[Math.floor(Math.random() * (this.chords.length - 1))];
    this.sub.next(match);
    this.chord = match;
    this.form.patchValue({
      answer: match.fullName,
      guess: '',
      total: this.form.value.total + 1,
    });
  }
  submitAnswer() {
    const { answer, guess, correct, incorrect } = this.form.value;
    if (guess === answer) {
      this.form.patchValue({ guess: null, correct: correct + 1 });
      this.setAnswer();
    } else {
      this.form.patchValue({ incorrect: incorrect + 1 });
    }
  }

  reset() {
    this.form.reset();
    this.setAnswer();
  }
}
