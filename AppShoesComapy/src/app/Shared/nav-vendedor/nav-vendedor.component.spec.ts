import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavVendedorComponent } from './nav-vendedor.component';

describe('NavVendedorComponent', () => {
  let component: NavVendedorComponent;
  let fixture: ComponentFixture<NavVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavVendedorComponent]
    });
    fixture = TestBed.createComponent(NavVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
