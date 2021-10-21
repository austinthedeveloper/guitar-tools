import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserOptions, UserOptionsInterface } from '@guitar/interfaces';
import { TuningHelper } from '@guitar/helpers';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private _options: BehaviorSubject<UserOptionsInterface> = new BehaviorSubject(
    new UserOptions()
  );
  public options$ = this._options.asObservable();
  frets$ = this.options$.pipe(map((options) => options.frets));
  tuning$ = this.options$.pipe(map((options) => options.tuning));
  tuningChart$ = this.tuning$.pipe(
    map((tuning) => {
      const tune: string[] = TuningHelper.getTuning(tuning);
      return TuningHelper.buildTuningChart(tune);
    })
  );

  constructor() {}

  setOption(options: Partial<UserOptionsInterface>) {
    this._options.next({
      ...this._options.value,
      ...options,
    });
  }
}
