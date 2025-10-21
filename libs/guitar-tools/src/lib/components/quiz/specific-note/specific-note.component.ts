import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges, OnChanges,
} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ChordInterface, PressInterface } from '@guitar/interfaces';
import { orderBy, random, uniq } from 'lodash-es';
import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';
import { GuitarFormsModule } from '@guitar/forms';
import { ChordComponent } from '../../chord/chord.component';
import { NumberProperPipe } from '../../../pipes/number-proper.pipe';

@Component({
  selector: 'guitar-specific-note',
  templateUrl: './specific-note.component.html',
  styleUrls: ['./specific-note.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GuitarFormsModule,
    ChordComponent,
    NumberProperPipe,
  ],
})
export class SpecificNoteComponent extends ChordQuizBaseComponent implements OnChanges {
  @Input() chords: ChordInterface[] = [];
  positionForm = this.fb.group({
    fret: this.fb.control('', Validators.required),
    string: this.fb.control('', Validators.required),
  });
  callback = (guess: string[], answer: string[]) =>
    answer.every((ans) => guess.includes(ans));

  options: string[] = [];

  constructor() {
    super();
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
      this.guess.patchValue([]);
      this.answer.patchValue(uniqueValues);
    }
    this.markStart();
  }

  submit() {
    this.submitAnswer();
  }

  addGuess(v: string) {
    const currentValues: string[] = this.guess.value;

    if (!currentValues.includes(v)) {
      const ordered = orderBy([...currentValues, v], (item) => item);
      this.guess.patchValue(ordered);
    }

    if (this.callback(this.guess.value, this.answer.value)) {
      this.submitAnswer();
    }
  }

  get positionFormAsInterface(): PressInterface[] {
    const formValue = this.positionForm.value as PressInterface;
    return [formValue];
  }
}
