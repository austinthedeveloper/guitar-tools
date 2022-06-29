import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TuningHelper } from '@guitar/helpers';
import { ChordInterface, PressInterface } from '@guitar/interfaces';
import { isEqual, random, reverse } from 'lodash-es';
import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
  selector: 'guitar-triad-note-order',
  templateUrl: './triad-note-order.component.html',
  styleUrls: ['./triad-note-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriadNoteOrderComponent extends ChordQuizBaseComponent {
  @Input() chords: ChordInterface[] = [];
  noteForm = this.fb.group({
    chord: this.fb.control(null, Validators.required),
    presses: this.fb.control<PressInterface[]>([], Validators.required),
  });
  callback = (guess: string[], answer: string[]) => isEqual(guess, answer);

  tuning = TuningHelper.getTuning('standard');
  tuningChart = TuningHelper.buildTuningChart(this.tuning);

  constructor(fb: FormBuilder) {
    super(fb);
    this.setAnswer();
  }

  ngOnChanges({ chords }: SimpleChanges): void {
    if (chords && this.chords.length) {
      this.setAnswer();
    }
  }

  setAnswer() {
    if (!this.chords.length) return;
    const scaleIndex = random(this.chords.length - 1);
    const item = this.chords[scaleIndex];
    this.chordName.patchValue(item.name);
    const reversedChart = reverse(this.tuningChart);
    const options = item.presses.map((press) => {
      const fret = +press.fret >= 12 ? +press.fret - 12 : +press.fret;
      return reversedChart[+press.string - 1].scale[fret];
    });

    if (isEqual(options, this.answer.value)) {
      console.log('is equal');
    }

    this.presses.patchValue(item.presses);
    this.guess.patchValue(reverse([...options]));
    this.answer.patchValue([...options]);
  }

  drop(changedItem: CdkDragDrop<string[]>, guess: string[]) {
    moveItemInArray(guess, changedItem.previousIndex, changedItem.currentIndex);
  }

  get chordName() {
    return this.noteForm.controls.chord;
  }

  get presses() {
    return this.noteForm.controls.presses;
  }
}
