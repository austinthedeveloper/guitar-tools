import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'guitar-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent implements OnInit, OnChanges {
  @Input() bpm = 120;
  form = new FormControl(this.bpm);
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
    return setInterval(() => {
      console.log('timeout', new Date());

    }, test);
  }

}
