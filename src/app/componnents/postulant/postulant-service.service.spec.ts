import { TestBed } from '@angular/core/testing';

import { PostulantServiceService } from './postulant-service.service';

describe('PostulantServiceService', () => {
  let service: PostulantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostulantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
