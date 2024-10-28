import { TestBed } from '@angular/core/testing';

import { TokenHttpService } from './token-http.service';

describe('TokenHttpService', () => {
  let service: TokenHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
