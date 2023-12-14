import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionVendedorComponent } from './informacion-vendedor.component';

describe('InformacionVendedorComponent', () => {
  let component: InformacionVendedorComponent;
  let fixture: ComponentFixture<InformacionVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionVendedorComponent]
    });
    fixture = TestBed.createComponent(InformacionVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
