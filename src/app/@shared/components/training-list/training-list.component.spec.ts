import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TrainingService } from '@shared/services/training/training.service';
import { LoaderService } from '@core/loader/loading-indicator.service';

import { TrainingListComponent } from './training-list.component';
import { HttpModule } from '@angular/http';

import { UserInfo } from '@shared/entities/user-info';
import { Training } from '@shared/entities/training';

describe('TrainingListComponent', () => {
  let component: TrainingListComponent;
  let fixture: ComponentFixture<TrainingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ TrainingListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        TrainingService,
        LoaderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingListComponent);
    component = fixture.componentInstance;
    component.userInfo = new UserInfo();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
