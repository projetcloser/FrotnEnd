import { TestBed } from '@angular/core/testing';

import { AmendeServiceService } from './amende-service.service';

describe('AmendeServiceService', () => {
  let service: AmendeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmendeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
