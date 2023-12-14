import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCompradorComponent } from './nav-comprador.component';

describe('NavCompradorComponent', () => {
  let component: NavCompradorComponent;
  let fixture: ComponentFixture<NavCompradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavCompradorComponent]
    });
    fixture = TestBed.createComponent(NavCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
