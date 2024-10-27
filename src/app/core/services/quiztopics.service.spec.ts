import { TestBed } from '@angular/core/testing';
import { QuiztopicsService } from './quiztopics.service';

describe('QuiztopicsService', () => {
  let service: QuiztopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuiztopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
