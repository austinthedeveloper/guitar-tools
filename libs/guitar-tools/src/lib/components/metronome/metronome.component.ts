import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'guitar-metronome',
    templateUrl: './metronome.component.html',
    styleUrls: ['./metronome.component.css'],
    standalone: false
})
export class MetronomeComponent implements OnChanges {
  @Input() bpm = 120;
  form = new UntypedFormControl(this.bpm);
  interval = this.intervalSet();

  ngOnChanges({ bpm }: SimpleChanges): void {
    if (bpm) {
      this.form.patchValue(this.bpm);
    }
  }

  private intervalSet(int = this.bpm) {
    const test = (60 / int) * 1000;
    return interval(test).pipe(
      // tap(res => console.log('timeout', new Date())),
      map((res) => true),
      map((res) => false)
    );
  }
}
