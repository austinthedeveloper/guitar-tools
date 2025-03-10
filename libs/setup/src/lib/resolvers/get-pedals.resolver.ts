import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PedalService } from '../services';
import { Pedal } from '@guitar/interfaces';
import { Observable } from 'rxjs';

export const getPedalsResolver: ResolveFn<Observable<Pedal[]>> = () => {
  const service = inject(PedalService);
  return service.getPedals();
};
