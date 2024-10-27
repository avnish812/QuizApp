import { TestBed } from '@angular/core/testing';

import { UploadfileserService } from './uploadfileser.service';

describe('UploadfileserService', () => {
  let service: UploadfileserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadfileserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
