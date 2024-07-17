import { TestBed } from '@angular/core/testing';

import { CaisseServiceService } from './caisse-service.service';

describe('CaisseServiceService', () => {
  let service: CaisseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaisseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
