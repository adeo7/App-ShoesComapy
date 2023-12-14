import { TestBed } from '@angular/core/testing';

import { GetProductosService } from './get-productos.service';

describe('GetProductosService', () => {
  let service: GetProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
