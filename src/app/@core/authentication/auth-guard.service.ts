import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from '@core/authentication/auth.service';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate, OnDestroy {

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private router: Router,
        private oidcSecurityService: OidcSecurityService,
        private authService: AuthService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.oidcSecurityService.getIsAuthorized().takeUntil(this.destroy$)
            .map((isAuthorized: boolean) => {

                if (isAuthorized) {
                    return true;
                }

                // Stores the attempted URL for redirecting.
                this.authService.setRedirectUrl(state.url);

                // Not signed in so redirects to unauthorized page.
                this.router.navigate(['/unauthorized']);

                return false;

            });
    }

    ngOnDestroy() {        
        this.destroy$.next(true);        
        this.destroy$.unsubscribe();
    }

}
