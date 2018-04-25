import { TestBed, inject } from '@angular/core/testing';

import { SkillsService } from './skills.service';
import { Http, ConnectionBackend, RequestOptions, HttpModule } from '@angular/http';

describe('SkillsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        SkillsService,
        Http,
        ConnectionBackend,
        RequestOptions
      ]
    });
  });

  xit('should be created', inject([SkillsService], (service: SkillsService) => {
    expect(service).toBeTruthy();
  }));
});
