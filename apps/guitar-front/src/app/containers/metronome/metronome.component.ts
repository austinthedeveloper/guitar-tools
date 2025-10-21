import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MetronomeComponent as LibMetronomeComponent } from '@guitar/metronome';

@Component({
  selector: 'guitar-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.scss'],
  standalone: true,
  imports: [CommonModule, LibMetronomeComponent],
})
export class MetronomeComponent {}
