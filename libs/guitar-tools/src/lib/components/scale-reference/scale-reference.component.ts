import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SCALE, TuningHelper } from '@guitar/helpers';
import { PressInterface, TuningChart } from '@guitar/interfaces';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'guitar-scale-reference',
  templateUrl: './scale-reference.component.html',
  styleUrls: ['./scale-reference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScaleReferenceComponent {
  @Input() tuning: string;
  @Input() tuningChart: TuningChart[];
  @Input() frets: number;
  @Input() showNote!: boolean;
  tabs: PressInterface[];

  scaleForm = this.fb.group({
    key: ['', Validators.required],
    scale: ['', Validators.required],
  });
  tabs$: Observable<PressInterface[]> = this.scaleForm.valueChanges.pipe(
    map(() => this.buildScale())
  );
  scaleOptions = SCALE;
  scaleTypeOptions = TuningHelper.getScaleOptions;
  formSub: Subscription;

  constructor(private fb: FormBuilder) {}

  buildScale(): PressInterface[] {
    if (!this.tuningChart) return [];
    const { key, scale } = this.scaleForm.value;
    if (!key || !scale) {
      return [];
    }
    const tuning = TuningHelper.getScaleByKeyAndType(key, scale);

    return TuningHelper.buildNotes(tuning, this.tuningChart);
  }
}
