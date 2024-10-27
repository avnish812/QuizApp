import { TestBed } from '@angular/core/testing';

import { TopicSericesService } from './topic-serices.service';

describe('TopicSericesService', () => {
  let service: TopicSericesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicSericesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
