import { TestBed } from '@angular/core/testing';

import { ResignService } from './resign.service';

describe('ResignService', () => {
  let service: ResignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
