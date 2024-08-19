import { TestBed } from '@angular/core/testing';

import { AttestPersonnelService } from './attest-personnel.service';

describe('AttestPersonnelService', () => {
  let service: AttestPersonnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttestPersonnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
