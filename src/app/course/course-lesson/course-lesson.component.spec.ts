import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonComponent } from './course-lesson.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SharedModule } from '@shared/shared.module';

describe('CourseLessonComponent', () => {
  let component: CourseLessonComponent;
  let fixture: ComponentFixture<CourseLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ CourseLessonComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ConfirmationDialogComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
