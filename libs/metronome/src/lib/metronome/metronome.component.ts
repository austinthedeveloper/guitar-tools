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

@Component({
  selector: 'lib-metronome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSliderModule],
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

  @Output() onClick = new EventEmitter();

  callbackFn = () => {
    this.onClick.emit();
    if (this.form.value.playAudio) {
      this.audioSrc.currentTime = 0;
      this.audioSrc.play();
    }
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
}
