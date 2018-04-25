
// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from 'app/material.module';

// Directives
import { CapslockMonitorDirective } from '@shared/directives/capslock-monitor/capslock-monitor.directive';
import { SpecialCharactersDirective } from '@shared/directives/special-characters/special-characters.directive';
import { FileDndDirective } from './directives/file-dnd/file-dnd.directive';

// Service
import { SkillsService } from './services/skills/skills.service';
import { UserService } from '@shared/services/user/user.service';
import { TrainingService } from '@shared/services/training/training.service';
import { EmployeeService } from '@shared/services/employee/employee.service';
import { SearchboxService } from './services/searchbox/searchbox.service';
import { FileService } from './services/file/file.service';
import { LessonService } from './services/lesson/lesson.service';

// Components
import { LoadingIndicatorComponent } from '@shared/components/loader/loading-indicator.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ChipListComponent } from './components/chip-component/chip-component.component';
import { SearchboxComponent } from '@shared/components/searchbox/searchbox.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CapslockMonitorDirective,
    SpecialCharactersDirective,
    FileDndDirective,
    LoadingIndicatorComponent,
    ConfirmationDialogComponent,
    ChipListComponent,
    SearchboxComponent
  ],
  exports: [
    CapslockMonitorDirective,
    SpecialCharactersDirective,
    FileDndDirective,
    ConfirmationDialogComponent,
    ChipListComponent,
    SearchboxComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [
    SkillsService,
    UserService,
    EmployeeService,
    TrainingService,
    SearchboxService,
    FileService,
    LessonService
  ]
})

export class SharedModule { }
