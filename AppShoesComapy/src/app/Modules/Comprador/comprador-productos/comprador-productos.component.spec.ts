import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradorProductosComponent } from './comprador-productos.component';

describe('CompradorProductosComponent', () => {
  let component: CompradorProductosComponent;
  let fixture: ComponentFixture<CompradorProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompradorProductosComponent]
    });
    fixture = TestBed.createComponent(CompradorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
