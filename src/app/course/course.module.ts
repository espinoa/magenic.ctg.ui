import { SharedModule } from './../@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material.module';

import { MainLayoutModule } from '@shared/layout/main-layout/main-layout.module';
import { CourseRoutingModule } from './course-routing.module';

import { CourseComponent } from './course.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';
import {  VideoPlayerComponent  } from '@shared/components/video-player/video-player.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainLayoutModule,
    CourseRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [CourseComponent, CourseInfoComponent, CourseLessonComponent, VideoPlayerComponent]
})
export class CourseModule { }
