import { Subscription } from 'rxjs/Subscription';
import { UserInfo } from '@shared/entities/user-info';
import { UserService } from './../../services/user/user.service';
import { MainFooterComponent } from './footer/main-footer.component';
import { MainHeaderComponent } from './header/main-header.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '@core/loader/loading-indicator.service';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.less']
})

export class MainLayoutComponent implements OnInit, OnDestroy {
    currentUser: UserInfo;
    private userSubscription: Subscription;
    constructor(
        private userService: UserService,
        private loaderService: LoaderService
    ) { }

    ngOnInit() {

        // We need to subscribe first before loading data in IdentityServer
        // So that whenever the currentUser$ changes we will get notified
        this.loaderService.show();
        this.userSubscription = this.userService.currentUser$.subscribe(
            currentUser => {
                this.currentUser = currentUser;
                this.loaderService.hide();
            });

        // This will load user credentials from the Identity Server and from the database.
        this.userService.loadUserInfoFromIdentityServer();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
