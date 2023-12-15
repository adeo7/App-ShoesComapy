import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaPqrsComponent } from './respuesta-pqrs.component';

describe('RespuestaPqrsComponent', () => {
  let component: RespuestaPqrsComponent;
  let fixture: ComponentFixture<RespuestaPqrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RespuestaPqrsComponent]
    });
    fixture = TestBed.createComponent(RespuestaPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
