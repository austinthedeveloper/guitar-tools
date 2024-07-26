import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-metronome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metronome.component.html',
  styleUrl: './metronome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetronomeComponent {}
