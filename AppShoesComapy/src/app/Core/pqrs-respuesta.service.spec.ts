import { TestBed } from '@angular/core/testing';

import { PqrsRespuestaService } from './pqrs-respuesta.service';

describe('PqrsRespuestaService', () => {
  let service: PqrsRespuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PqrsRespuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
