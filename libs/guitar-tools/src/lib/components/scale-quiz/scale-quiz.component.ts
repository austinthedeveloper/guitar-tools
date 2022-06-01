import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SCALE, TuningHelper } from '@guitar/helpers';
import { PressInterface, TuningChart } from '@guitar/interfaces';
import { random } from 'lodash-es';
import { ChordQuizBaseComponent } from '../quiz-base/quiz-base.component';

@Component({
  selector: 'guitar-scale-quiz',
  templateUrl: './scale-quiz.component.html',
  styleUrls: ['./scale-quiz.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScaleQuizComponent
  extends ChordQuizBaseComponent
  implements OnChanges
{
  @Input() tuning: string;
  @Input() tuningChart: TuningChart[];
  @Input() frets: number;
  tabs: PressInterface[];

  answerForm = this.fb.group({
    key: ['', Validators.required],
    scale: ['', Validators.required],
  });

  scaleForm = this.fb.group({
    key: ['', Validators.required],
    scale: ['', Validators.required],
  });
  scaleOptions = SCALE;
  scaleTypeOptions = TuningHelper.getScaleOptions;

  constructor(fb: FormBuilder) {
    super(fb);
  }

  ngOnChanges({ tuningChart }: SimpleChanges): void {
    if (tuningChart) {
      this.setAnswer();
    }
  }

  setAnswer(): void {
    this.answerForm.reset();
    this.randomizeValues();
    this.tabs = this.buildScale();
  }

  submit() {
    const answerForm = this.answerForm.value;
    this.guess.patchValue(`${answerForm.key} - ${answerForm.scale}`);
    this.submitAnswer();
  }

  randomizeValues() {
    const randomKey = random(this.scaleOptions.length - 1);
    const randomScale = random(this.scaleTypeOptions.length - 1);

    this.scaleForm.patchValue({
      key: this.scaleOptions[randomKey],
      scale: this.scaleTypeOptions[randomScale].value,
    });
  }

  buildScale(): PressInterface[] {
    if (!this.tuningChart) return [];
    const scaleForm = this.scaleForm.value;
    const tuning = TuningHelper.getScaleByKeyAndType(
      scaleForm.key,
      scaleForm.scale
    );

    this.form.patchValue({
      answer: `${scaleForm.key} - ${scaleForm.scale}`,
      guess: null,
      total: this.form.value.total + 1,
    });

    return TuningHelper.buildNotes(tuning, this.tuningChart);
  }
}
