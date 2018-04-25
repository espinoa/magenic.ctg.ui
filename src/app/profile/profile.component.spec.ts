
import { APP_INITIALIZER, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { OidcSecurityService, OidcConfigService, AuthModule } from 'angular-auth-oidc-client';

import { AuthGuardService } from '@core/authentication/auth-guard.service';
import { AuthService } from '@core/authentication/auth.service';
import { loadConfig } from '@core/identityServer/identity-server.module';

import { ProfileService } from 'app/profile/profile.service';
import { LoaderService } from '@core/loader/loading-indicator.service';

import { SharedModule } from '../@shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { AppRoutingModule } from 'app/app-routing.module';

import { AppComponent } from 'app/app.component';
import { ProfileComponent } from './profile.component';
import { SkillComponent } from '@shared/components/skill/skill.component';
import { MainLayoutComponent } from '@shared/layout/main-layout/main-layout.component';
import { UnauthorizedComponent } from 'app/unauthorized/unauthorized.component';

import { Skill } from '../@shared/entities/skill';
import { UserInfo } from '@shared/entities/user-info';

describe('Component: Profile', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    let nameEl: DebugElement;
    let jobTitleEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppRoutingModule,
                CommonModule,
                SharedModule,
                ProfileRoutingModule,
                HttpClientModule,
                AuthModule.forRoot(),
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                ProfileService,
                LoaderService,
                OidcSecurityService,
                OidcConfigService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: loadConfig,
                    deps: [OidcConfigService],
                    multi: true,
                },
                AuthGuardService,
                AuthService,
                { provide: APP_BASE_HREF, useValue: '/my/app' }
            ],
            declarations: [
                AppComponent,
                MainLayoutComponent,
                UnauthorizedComponent,
                ProfileComponent,
                SkillComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;

        nameEl = fixture.debugElement.query(By.css('#profile-name-complete'));
        jobTitleEl = fixture.debugElement.query(By.css('#profile-name-title'));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render current user name', () => {
        expect(nameEl.nativeElement.hidden).toBeFalsy();
    });

    it('should display current user complete name', () => {
        component.currentUser = new UserInfo();
        component.currentUser.firstName = 'Siti';
        component.currentUser.lastName = 'Jee';
        component.currentUser.jobTitle = 'Lead Developer';

        fixture.detectChanges();

        const completeName = component.currentUser.firstName + ' ' + component.currentUser.lastName;

        expect(nameEl.nativeElement.innerText).toEqual(completeName);
    });

    it('should render current user job title', () => {
        expect(jobTitleEl.nativeElement.hidden).toBeFalsy();
    });

    it('should display current user job title', () => {
        component.currentUser = new UserInfo();
        component.currentUser.firstName = 'Siti';
        component.currentUser.lastName = 'Jee';
        component.currentUser.jobTitle = 'Lead Developer';

        fixture.detectChanges();

        expect(jobTitleEl.nativeElement.innerText).toEqual(component.currentUser.jobTitle);
    });
});
