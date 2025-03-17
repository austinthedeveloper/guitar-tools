import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PedalBoard } from '@guitar/interfaces';
import { Observable } from 'rxjs';
import { PedalBoardService } from '../services';

export const getPedalboardsResolver: ResolveFn<
  Observable<PedalBoard[]>
> = () => {
  const service = inject(PedalBoardService);
  return service.getAll();
};
