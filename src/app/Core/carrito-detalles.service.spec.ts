import { TestBed } from '@angular/core/testing';

import { CarritoDetallesService } from './carrito-detalles.service';

describe('CarritoDetallesService', () => {
  let service: CarritoDetallesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoDetallesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
