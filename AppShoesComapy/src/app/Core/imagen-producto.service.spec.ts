import { TestBed } from '@angular/core/testing';

import { ImagenProductoService } from './imagen-producto.service';

describe('ImagenProductoService', () => {
  let service: ImagenProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
