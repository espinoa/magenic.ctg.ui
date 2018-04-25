import { UserInfo } from '@shared/entities/user-info';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { OidcSecurityService, AuthorizationResult } from 'angular-auth-oidc-client';
import 'rxjs/add/operator/takeUntil';

export class UserServiceStub {
    private currentUser = new Subject<UserInfo>();
    public currentUser$ = this.currentUser.asObservable();

    private destroyed$ = new Subject();
    private subscription: Subscription;

    private userInfo: UserInfo;

    constructor() {
        const userInfo = new UserInfo();
        userInfo.firstName = 'Ted';
        userInfo.lastName = 'Borlongan';

        // set up the current user observable with a user that has a sample name
        this.currentUser = new BehaviorSubject<UserInfo>(userInfo);
    }

    public loadUserInfoFromIdentityServer() {
        this.loadUserInfo(this.userInfo);
    }

    private loadUserInfo(info: UserInfo): void {
        this.currentUser.next(info);
    }
}

