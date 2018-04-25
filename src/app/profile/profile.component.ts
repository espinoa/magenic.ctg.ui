import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SkillsService } from '@shared/services/skills/skills.service';
import { Skill } from '@shared/entities/skill';
import { UserInfo } from '@shared/entities/user-info';

import { UserService } from '@shared/services/user/user.service';
import { SearchboxService } from './../@shared/services/searchbox/searchbox.service';

import { OidcSecurityService, AuthorizationResult } from 'angular-auth-oidc-client';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { LoaderService } from '@core/loader/loading-indicator.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
    encapsulation: ViewEncapsulation.None
})

export class ProfileComponent implements OnInit, OnDestroy {
    private userId = 1;
    private userSubscription: Subscription;
    // private keywordSubscription: Subscription;
    private keyword: string;

    public userImage: string;
    private readonly defaultImage = '/assets/app/img/default-user-image.png';

    skillset: Skill[];
    currentUser: UserInfo;

    constructor(
        private skillsService: SkillsService,
        private userService: UserService,
        private profileService: ProfileService,
        private searchboxService: SearchboxService,
        private titleService: Title,
        private router: Router,
        private loaderService: LoaderService) {

        this.titleService.setTitle('Profile | Technical Case Study');
    }

    ngOnInit() {
        this.loaderService.show();
        this.userSubscription = this.userService.currentUser$.subscribe(
            currentUser => {
                this.currentUser = currentUser;
                this.userImage = (this.currentUser && this.currentUser.imageUrl) ? this.currentUser.imageUrl : this.defaultImage;

                if (this.currentUser) {
                    this.loaderService.show();
                    this.skillsService.getSkills(this.currentUser.employeeId).subscribe((skills: Skill[]) => {
                        this.skillset = skills;
                        this.loaderService.hide();
                    });
                }
                this.loaderService.hide();
            });
    }

    receiveKeyword(event) {
        this.keyword = event;
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}

