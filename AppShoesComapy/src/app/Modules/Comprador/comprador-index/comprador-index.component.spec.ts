import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradorIndexComponent } from './comprador-index.component';

describe('CompradorIndexComponent', () => {
  let component: CompradorIndexComponent;
  let fixture: ComponentFixture<CompradorIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompradorIndexComponent]
    });
    fixture = TestBed.createComponent(CompradorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
