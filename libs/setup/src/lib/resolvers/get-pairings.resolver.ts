import { ResolveFn } from '@angular/router';
import { PairingService } from '../services';
import { inject } from '@angular/core';
import { Pairing } from '@guitar/interfaces';
import { Observable } from 'rxjs';

export const getPairingsResolver: ResolveFn<Observable<Pairing[]>> = () => {
  const service = inject(PairingService);
  return service.getPairings();
};
