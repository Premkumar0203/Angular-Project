import { TestBed } from '@angular/core/testing';

import { DigitalBookService } from './digital-book.service';

describe('DigitalBookService', () => {
  let service: DigitalBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigitalBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
