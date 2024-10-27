import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignquizComponent } from './assignquiz.component';

describe('AssignquizComponent', () => {
  let component: AssignquizComponent;
  let fixture: ComponentFixture<AssignquizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignquizComponent]
    });
    fixture = TestBed.createComponent(AssignquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
