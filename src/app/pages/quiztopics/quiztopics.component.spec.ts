import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiztopicsComponent } from './quiztopics.component';

describe('QuiztopicsComponent', () => {
  let component: QuiztopicsComponent;
  let fixture: ComponentFixture<QuiztopicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuiztopicsComponent]
    });
    fixture = TestBed.createComponent(QuiztopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
