import { TestBed } from '@angular/core/testing';

import { GetLocalesService } from './get-locales.service';

describe('GetLocalesService', () => {
  let service: GetLocalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLocalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
