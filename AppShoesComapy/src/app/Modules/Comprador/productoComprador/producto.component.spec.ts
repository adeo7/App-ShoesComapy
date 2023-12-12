import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCompradorComponent } from './productoComprador.component';

describe('ProductoCompradorComponent', () => {
  let component: ProductoCompradorComponent;
  let fixture: ComponentFixture<ProductoCompradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoCompradorComponent]
    });
    fixture = TestBed.createComponent(ProductoCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
