import { TestBed } from '@angular/core/testing';

import { NonPayeService } from './non-paye.service';

describe('NonPayeService', () => {
  let service: NonPayeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonPayeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
