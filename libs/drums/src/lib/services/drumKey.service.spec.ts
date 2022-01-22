/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrumKeyService } from './drumKey.service';

describe('Service: DrumKey', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrumKeyService]
    });
  });

  it('should ...', inject([DrumKeyService], (service: DrumKeyService) => {
    expect(service).toBeTruthy();
  }));
});
