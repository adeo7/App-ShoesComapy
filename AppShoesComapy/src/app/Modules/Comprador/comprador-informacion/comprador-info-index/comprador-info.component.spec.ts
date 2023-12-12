import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradorInfoComponent } from './comprador-info.component';

describe('CompradorInfoComponent', () => {
  let component: CompradorInfoComponent;
  let fixture: ComponentFixture<CompradorInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompradorInfoComponent]
    });
    fixture = TestBed.createComponent(CompradorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
