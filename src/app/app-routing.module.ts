import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'course', loadChildren: './course/course.module#CourseModule' },
    { path: '**', redirectTo: 'unauthorized' }
];

/**
 * App routing module
 */
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
