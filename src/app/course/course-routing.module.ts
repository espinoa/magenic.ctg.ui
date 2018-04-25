import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';

const routes: Routes = [
  {
    path: '', component: CourseComponent, children:
      [        
        { path: 'new', component: CourseInfoComponent },
        { path: 'edit/:id', component: CourseInfoComponent },
        {path: ':id', component: CourseLessonComponent}
       
      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
