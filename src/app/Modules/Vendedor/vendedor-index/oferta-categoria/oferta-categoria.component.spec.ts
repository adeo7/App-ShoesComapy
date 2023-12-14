import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaCategoriaComponent } from './oferta-categoria.component';

describe('OfertaCategoriaComponent', () => {
  let component: OfertaCategoriaComponent;
  let fixture: ComponentFixture<OfertaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfertaCategoriaComponent]
    });
    fixture = TestBed.createComponent(OfertaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
