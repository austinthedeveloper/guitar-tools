import { debounceTime, filter, tap } from 'rxjs/operators';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-metronome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './metronome.component.html',
  styleUrl: './metronome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetronomeComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    bpm: 60,
  });

  private intervalCheck: any;
  callbackFn = () => {
    console.log('testing');
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
    this.setInterval();
  }

  onStop() {
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
