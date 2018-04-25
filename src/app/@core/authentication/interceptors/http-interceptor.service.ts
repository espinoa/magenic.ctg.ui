import { Injectable, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { OidcSecurityService, OidcConfigService } from 'angular-auth-oidc-client';
import { AuthService } from '../auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpInterceptorService {

  private oidcSecurityService: OidcSecurityService;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: Location,
    private injector: Injector,
    private oidcConfigService: OidcConfigService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Using the injector to reference the OidcSecurityService
    // will resolved the cyclic dependency
    if (this.oidcSecurityService === undefined) {
      this.oidcSecurityService = this.injector.get(OidcSecurityService);
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {

          // Store failed request so we can try to retry later
          this.auth.collectFailedRequest(request);

          // Store current route before request failed
          this.auth.setRedirectUrl(this.route.path());

          // redirect to the login route
          // or show a modal
          if (this.oidcSecurityService !== undefined) {

            this.oidcSecurityService.authorize();

          } else {
            this.router.navigate(['/']);
          }

        }
      }
    });
  }

}
