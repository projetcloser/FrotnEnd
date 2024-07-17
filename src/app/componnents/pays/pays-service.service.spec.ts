import { TestBed } from '@angular/core/testing';

import { PaysServiceService } from './pays-service.service';

describe('PaysServiceService', () => {
  let service: PaysServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaysServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
