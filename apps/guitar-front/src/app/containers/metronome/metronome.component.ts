import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MetronomeComponent as LibMetronomeComponent } from '@guitar/metronome';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.scss'],
  standalone: true,
  imports: [CommonModule, LibMetronomeComponent],
})
export class MetronomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
