import { TestBed } from '@angular/core/testing';

import { CachetService } from './cachet.service';

describe('CachetService', () => {
  let service: CachetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
