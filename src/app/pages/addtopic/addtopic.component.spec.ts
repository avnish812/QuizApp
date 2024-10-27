import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtopicComponent } from './addtopic.component';

describe('AddtopicComponent', () => {
  let component: AddtopicComponent;
  let fixture: ComponentFixture<AddtopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddtopicComponent]
    });
    fixture = TestBed.createComponent(AddtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
