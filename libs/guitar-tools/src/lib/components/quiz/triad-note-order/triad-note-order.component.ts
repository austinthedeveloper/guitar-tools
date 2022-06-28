import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChordInterface } from '@guitar/interfaces';
import { isEqual, random } from 'lodash-es';
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
  });
  callback = (guess: string[], answer: string[]) => isEqual(guess, answer);
  options: string[] = [];

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
    console.log('set answer', item);
  }

  drop(changedItem: CdkDragDrop<string[]>, guess: string[]) {
    moveItemInArray(guess, changedItem.previousIndex, changedItem.currentIndex);
  }

  get chordName() {
    return this.noteForm.controls.chord;
  }
}
