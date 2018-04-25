// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MainLayoutModule } from '@shared/layout/main-layout/main-layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { TrainingComponent } from '@shared/components/training/training.component';
import { TrainingListComponent } from '@shared/components/training-list/training-list.component';
import { ProfileComponent } from './profile.component';
import { SkillComponent } from '@shared/components/skill/skill.component';

// Services
import { ProfileService } from './profile.service';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        MainLayoutModule,
        NgbModule
    ],
    declarations: [
        ProfileComponent,
        TrainingComponent,
        TrainingListComponent,
        SkillComponent
    ],
    providers: [
        ProfileService
    ]
})

export class ProfileModule { }
