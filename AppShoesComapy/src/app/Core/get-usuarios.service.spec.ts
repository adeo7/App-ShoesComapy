import { TestBed } from '@angular/core/testing';

import { GetUsuariosService } from './get-usuarios.service';

describe('GetUsuariosService', () => {
  let service: GetUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
