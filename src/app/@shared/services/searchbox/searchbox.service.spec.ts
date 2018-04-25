import { TestBed, inject } from '@angular/core/testing';

import { SearchboxService } from './searchbox.service';

describe('SearchboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchboxService]
    });
  });

  it('should be created', inject([SearchboxService], (service: SearchboxService) => {
    expect(service).toBeTruthy();
  }));
});
