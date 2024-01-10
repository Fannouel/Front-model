import { TestBed } from '@angular/core/testing';

import { StaticConfigService } from './static-config.service';

describe('StaticConfigService', () => {
  let service: StaticConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
