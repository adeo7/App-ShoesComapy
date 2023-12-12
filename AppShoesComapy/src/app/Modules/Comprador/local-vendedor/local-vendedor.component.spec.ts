import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalVendedorComponent } from './local-vendedor.component';

describe('LocalVendedorComponent', () => {
  let component: LocalVendedorComponent;
  let fixture: ComponentFixture<LocalVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalVendedorComponent]
    });
    fixture = TestBed.createComponent(LocalVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
