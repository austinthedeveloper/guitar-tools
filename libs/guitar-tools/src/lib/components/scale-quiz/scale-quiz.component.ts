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

  scaleForm = this.fb.group({
    key: ['A', Validators.required],
    scale: ['major', Validators.required],
  });
  scaleOptions = SCALE;
  scaleTypeOptions = TuningHelper.getScaleOptions;

  constructor(fb: FormBuilder) {
    super(fb);
  }

  ngOnChanges({ tuningChart }: SimpleChanges): void {
    if (tuningChart) {
      this.tabs = this.buildScale();
    }
  }

  buildScale() {
    if (!this.tuningChart) return null;
    const scaleForm = this.scaleForm.value;
    const tuning = TuningHelper.getScaleByKeyAndType(
      scaleForm.key,
      scaleForm.scale
    );

    return TuningHelper.buildNotes(tuning, this.tuningChart);
  }
}
