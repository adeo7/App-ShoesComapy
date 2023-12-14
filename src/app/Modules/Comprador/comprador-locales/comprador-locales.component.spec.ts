import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradorLocalesComponent } from './comprador-locales.component';

describe('CompradorLocalesComponent', () => {
  let component: CompradorLocalesComponent;
  let fixture: ComponentFixture<CompradorLocalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompradorLocalesComponent]
    });
    fixture = TestBed.createComponent(CompradorLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
