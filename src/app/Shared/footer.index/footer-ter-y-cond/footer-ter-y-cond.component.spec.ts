import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTerYCondComponent } from './footer-ter-y-cond.component';

describe('FooterTerYCondComponent', () => {
  let component: FooterTerYCondComponent;
  let fixture: ComponentFixture<FooterTerYCondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterTerYCondComponent]
    });
    fixture = TestBed.createComponent(FooterTerYCondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
