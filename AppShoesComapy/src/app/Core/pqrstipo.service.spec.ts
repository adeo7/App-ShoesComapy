import { TestBed } from '@angular/core/testing';

import { PqrstipoService } from './pqrstipo.service';

describe('PqrstipoService', () => {
  let service: PqrstipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PqrstipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
