import { TestBed } from '@angular/core/testing';

import { DetteServiceService } from './dette-service.service';

describe('DetteServiceService', () => {
  let service: DetteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
