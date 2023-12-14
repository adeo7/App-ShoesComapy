import { TestBed } from '@angular/core/testing';

import { CarritoPedidoService } from './carrito-pedido.service';

describe('CarritoPedidoService', () => {
  let service: CarritoPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
