import { TestBed } from '@angular/core/testing';

import { AcceptcoinsService } from './acceptcoins.service';

describe('AcceptcoinsService', () => {
  let service: AcceptcoinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptcoinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
