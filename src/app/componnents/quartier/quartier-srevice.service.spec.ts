import { TestBed } from '@angular/core/testing';

import { QuartierSreviceService } from './quartier-srevice.service';

describe('QuartierSreviceService', () => {
  let service: QuartierSreviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuartierSreviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
