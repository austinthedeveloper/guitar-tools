import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserOptions, UserOptionsInterface } from '@guitar/interfaces';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'guitar-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css'],
})
export class UserOptionsComponent implements OnChanges, OnDestroy {
  @Input() options: UserOptionsInterface | null = new UserOptions();
  @Output() optionChanged: EventEmitter<UserOptionsInterface> =
    new EventEmitter();
  form = this.fb.group({
    tuning: ['', Validators.required],
    frets: ['', Validators.required],
    strings: ['', Validators.required],
  });
  tuning = [
    {
      key: 'Standard',
      value: 'standard',
    },
    {
      key: 'Drop D',
      value: 'dropD',
    },
  ];
  formSub = this.form.valueChanges
    .pipe(filter(() => this.form.valid && this.form.dirty))
    .subscribe((options) => this.optionChanged.emit(options));

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  ngOnChanges({ options }: SimpleChanges): void {
    if (options && this.options) {
      this.form.reset();
      this.form.patchValue(this.options);
    }
  }
}
