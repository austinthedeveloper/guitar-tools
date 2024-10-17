import { debounceTime, filter, tap } from 'rxjs/operators';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MetronomeBarsComponent } from './components/metronome-bars/metronome-bars.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-metronome',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule,
    MetronomeBarsComponent,
  ],
  templateUrl: './metronome.component.html',
  styleUrl: './metronome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetronomeComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    bpm: [60, Validators.max(255)],
    noteValue: ['quarters'],
    playAudio: false,
  });
  isPlaying = false;
  noteValues = [
    { label: 'Quarters', value: 'quarters' },
    { label: 'Eighths', value: 'eighths' },
    { label: 'Sixteenths', value: 'sixteenths' },
  ];

  private intervalCheck: any;
  private audioSrc: HTMLAudioElement = new Audio('/assets/metronome-85688.mp3');
  bars = [1, 2, 3, 4]; // Represent the four bars
  private _currentBar = new BehaviorSubject(0);
  currentBar$ = this._currentBar.asObservable();

  @Output() onClick = new EventEmitter();

  callbackFn = () => {
    this.onClick.emit();
    if (this.form.value.playAudio) {
      this.audioSrc.currentTime = 0;
      this.audioSrc.play();
    }
    this.updateBars();
  };
  private sub!: any;

  ngOnInit() {
    this.sub = this.form.controls.bpm.valueChanges
      .pipe(
        debounceTime(300),
        filter(() => this.intervalCheck),
        tap(() => this.onStart())
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onStart() {
    const selectedNoteValue = this.form.controls.noteValue.value;
    switch (selectedNoteValue) {
      case 'quarters':
        // Logic for quarter notes
        break;
      case 'eighths':
        // Logic for eighth notes
        break;
      case 'sixteenths':
        // Logic for sixteenth notes
        break;
    }
    this.isPlaying = true;
    this.callbackFn();
    this.setInterval();
  }

  onStop() {
    this.isPlaying = false;
    this.clearInterval();
  }

  private setInterval() {
    this.clearInterval();
    this.intervalCheck = setInterval(
      this.callbackFn,
      60000 / this.form.controls.bpm.value
    );
  }

  private clearInterval() {
    clearInterval(this.intervalCheck);
  }

  updateBars() {
    let current = this._currentBar.value;
    if (current === 0) {
      // If no bar is active, activate the first bar
      current = 1;
    } else {
      // Increment the current bar, reset to 1 when exceeding the number of bars
      current = (current % this.bars.length) + 1;
    }
    this._currentBar.next(current);
  }
}
