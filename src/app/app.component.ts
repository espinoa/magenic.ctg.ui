import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { OidcSecurityService, AuthorizationResult } from 'angular-auth-oidc-client';

import { AuthService } from '@core/authentication/auth.service';

import { environment } from '@environments/environment';
import { LoaderService } from '@core/loader/loading-indicator.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  // Gets the redirect URL from authentication service.
  // If no redirect has been set, uses the default.
  private getRedirectUrl(): string {
    return this.authService.getRedirectUrl()
      ? this.authService.getRedirectUrl()
      : environment.openIdConfig.post_login_route;
  }

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private router: Router,
    private authService: AuthService,
    private titleService: Title,
    private loaderService: LoaderService
  ) {

    this.titleService.setTitle('Home | Technical Case Study');

    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        this.authService.setRedirectUrl(window.location.pathname);
      }

    });

    if (this.oidcSecurityService.moduleSetup) {
      this.onOidcModuleSetup();
    } else {
      this.loaderService.show();
      this.oidcSecurityService.onModuleSetup.takeUntil(this.destroy$).subscribe(() => {
        this.onOidcModuleSetup();
        this.loaderService.hide();
      });
    }

    this.loaderService.show();

    this.oidcSecurityService.onAuthorizationResult.takeUntil(this.destroy$).subscribe(
      (authorizationResult: AuthorizationResult) => {
        this.onAuthorizationResultComplete(authorizationResult);
        this.loaderService.hide();
      });
  }

  ngOnInit() {

  }

  private login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.authService.removeRedirectUrl();
    this.oidcSecurityService.logoff();
  }

  private onOidcModuleSetup() {
    if (window.location.hash) {
      this.oidcSecurityService.authorizedCallback();
    } else {
      this.loaderService.show();

      if (this.authService.getRedirectUrl() == null && window.location.pathname !== environment.openIdConfig.post_login_route) {
        if (window.location.pathname === '/') {
          this.authService.setRedirectUrl(environment.openIdConfig.post_login_route);
        } else {
          this.authService.setRedirectUrl(window.location.pathname);
        }
      } else if (this.authService.getRedirectUrl() !== null && window.location.pathname !== this.authService.getRedirectUrl()) {
        this.authService.setRedirectUrl(window.location.pathname);
      }

      this.oidcSecurityService.getIsAuthorized().takeUntil(this.destroy$).subscribe((authorized: boolean) => {
        if (!authorized) {
          this.login();
        } else {
          const redirectUrl = this.getRedirectUrl();
          this.router.navigate([redirectUrl]);
        }
        this.loaderService.hide();
      });
    }
  }

  private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
    switch (authorizationResult) {
      case AuthorizationResult.authorized:

        const redirectUrl = this.getRedirectUrl();

        // Redirects the user.
        this.router.navigate([redirectUrl]);

        break;
      case AuthorizationResult.forbidden:
        this.router.navigate(['/forbidden']);
        break;
      case AuthorizationResult.unauthorized:
        this.router.navigate(['/unauthorized']);
        break;
      default:
        this.router.navigate([environment.openIdConfig.post_login_route]);

    }
  }

  private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data != null) {
      return JSON.parse(data);
    }

    return;
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
