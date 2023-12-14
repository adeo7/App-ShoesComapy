import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorIndexComponent } from './vendedor-index.component';

describe('VendedorIndexComponent', () => {
  let component: VendedorIndexComponent;
  let fixture: ComponentFixture<VendedorIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendedorIndexComponent]
    });
    fixture = TestBed.createComponent(VendedorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
