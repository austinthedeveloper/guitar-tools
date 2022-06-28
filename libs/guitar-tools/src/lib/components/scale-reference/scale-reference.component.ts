import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SCALE, TuningHelper } from '@guitar/helpers';
import { PressInterface, TuningChart } from '@guitar/interfaces';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  scaleOptions = SCALE;
  scaleTypeOptions = TuningHelper.getScaleOptions;
  formSub: Subscription;

  constructor(private fb: UntypedFormBuilder) {
    this.setFormSub();
  }

  private setFormSub() {
    this.formSub = this.scaleForm.valueChanges
      .pipe(
        tap(() => {
          this.tabs = this.buildScale();
        })
      )
      .subscribe();
  }

  buildScale(): PressInterface[] {
    if (!this.tuningChart) return [];
    const scaleForm = this.scaleForm.value;
    const tuning = TuningHelper.getScaleByKeyAndType(
      scaleForm.key,
      scaleForm.scale
    );

    return TuningHelper.buildNotes(tuning, this.tuningChart);
  }
}
