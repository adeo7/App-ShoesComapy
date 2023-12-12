import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCompradorComponent } from './informacion-comprador.component';

describe('InformacionCompradorComponent', () => {
  let component: InformacionCompradorComponent;
  let fixture: ComponentFixture<InformacionCompradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionCompradorComponent]
    });
    fixture = TestBed.createComponent(InformacionCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
