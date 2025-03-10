import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AmpService } from '../services';
import { Amp } from '@guitar/interfaces';
import { Observable } from 'rxjs';

export const getAmpsResolver: ResolveFn<Observable<Amp[]>> = () => {
  const service = inject(AmpService);
  return service.getAmps();
};
