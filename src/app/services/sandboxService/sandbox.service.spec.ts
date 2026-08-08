import { TestBed } from '@angular/core/testing';

import { SandobxService } from './sandbox.service';

describe('SandboxService', () => {
  let service: SandobxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SandobxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
