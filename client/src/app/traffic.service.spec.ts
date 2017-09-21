import { TestBed, inject } from '@angular/core/testing';

import { TrafficService } from './traffic.service';

describe('TrafficService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrafficService]
    });
  });

  it('should be created', inject([TrafficService], (service: TrafficService) => {
    expect(service).toBeTruthy();
  }));
});
