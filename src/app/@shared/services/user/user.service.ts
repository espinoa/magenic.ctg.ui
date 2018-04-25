import { UserInfo } from '@shared/entities/user-info';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { OidcSecurityService, AuthorizationResult } from 'angular-auth-oidc-client';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import { EmployeeService } from '@shared/services/employee/employee.service';
import { LoaderService } from '@core/loader/loading-indicator.service';

@Injectable()
export class UserService implements OnDestroy, OnInit {
    private currentUser = new BehaviorSubject<UserInfo>(undefined);
    public currentUser$ = this.currentUser.asObservable();

    private destroyed$: Subject<boolean> = new Subject<boolean>();

    private subscription: Subscription;

    public get currentUserInfo(): UserInfo {
        return this.currentUser.getValue();
    }

    constructor(
        private oidcSecurityService: OidcSecurityService,
        private employeeService: EmployeeService,
        private loaderService: LoaderService
    ) {
    }

    public ngOnInit() {
    }

    public loadUserInfoFromIdentityServer() {
        this.loaderService.show();
        this.subscription = this.oidcSecurityService.getUserData().takeUntil(this.destroyed$).subscribe(
            userInfo => {
                if (userInfo) {
                    this.loaderService.show();
                    this.employeeService.getEmployeeByEmail(userInfo.email)
                        .subscribe(employee => {
                            if (employee) {
                                const employeeWithToken = new UserInfo(employee.toJS());
                                employeeWithToken.sub = userInfo.sub;
                                employeeWithToken.role = userInfo.role;
                                this.currentUser.next(employeeWithToken);
                                this.loaderService.hide();
                            }
                        });
                }
                this.loaderService.hide();
            }
        );
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
