import { Component, Input, OnInit } from '@angular/core';
import { DrumKeyPress } from '../../interfaces';

@Component({
  selector: 'guitar-drum-tab',
  templateUrl: './drum-tab.component.html',
  styleUrls: ['./drum-tab.component.scss'],
})
export class DrumTabComponent implements OnInit {
  @Input() inputs: DrumKeyPress[] = [];
  constructor() {}

  ngOnInit() {}
}
