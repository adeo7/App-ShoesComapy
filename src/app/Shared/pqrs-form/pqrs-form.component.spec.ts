import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsFormComponent } from './pqrs-form.component';

describe('PqrsFormComponent', () => {
  let component: PqrsFormComponent;
  let fixture: ComponentFixture<PqrsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PqrsFormComponent]
    });
    fixture = TestBed.createComponent(PqrsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
