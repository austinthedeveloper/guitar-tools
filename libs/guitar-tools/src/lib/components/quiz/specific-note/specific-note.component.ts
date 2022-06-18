import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChordInterface } from '@guitar/interfaces';
import { isEqual, random, uniq } from 'lodash-es';
import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
  selector: 'guitar-specific-note',
  templateUrl: './specific-note.component.html',
  styleUrls: ['./specific-note.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecificNoteComponent extends ChordQuizBaseComponent {
  positionForm = this.fb.group({
    fret: this.fb.control(null, Validators.required),
    string: this.fb.control(null, Validators.required),
  });
  @Input() chords: ChordInterface[] = [];
  options: string[] = [];

  constructor(fb: FormBuilder) {
    super(fb);
    this.setAnswer();
  }

  ngOnChanges({ chords }: SimpleChanges): void {
    if (chords && this.chords.length) {
      this.setOptions();
      this.setAnswer();
    }
  }

  private setOptions() {
    this.options = uniq(this.chords.map((chord) => chord.name));
  }

  setAnswer(): void {
    if (!this.chords.length) return;
    const fret = (random(14) + 1).toString();
    const string = (random(4) + 1).toString();
    this.positionForm.patchValue({ fret, string });
    const values = this.chords
      .filter(
        (chord) =>
          chord.presses.filter(
            (press) => press.fret === fret && press.string === string
          ).length
      )
      .map((chord) => chord.name);
    const uniqueValues = uniq(values);

    if (!uniqueValues.length) {
      this.setAnswer();
    } else {
      this.answer.patchValue(uniqueValues);
    }
  }

  submit() {
    this.submitAnswer((guess: string[], answer: string[]) =>
      isEqual(guess, answer)
    );
  }
}
