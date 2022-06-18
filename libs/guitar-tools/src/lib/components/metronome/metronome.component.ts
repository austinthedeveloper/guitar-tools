import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { interval } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'guitar-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent implements OnInit, OnChanges {
  @Input() bpm = 120;
  form = new UntypedFormControl(this.bpm);
  interval = this.intervalSet();

  constructor() { }

  ngOnChanges({bpm}: SimpleChanges): void {
   if(bpm) {
     this.form.patchValue(this.bpm);
   }

  }

  ngOnInit() {}

  private intervalSet(int = this.bpm) {
    const test = (60 / int )* 1000;
    return interval(test).pipe(
      // tap(res => console.log('timeout', new Date())),
      map(res => true),
      map(res => false),
      )
  }

}
