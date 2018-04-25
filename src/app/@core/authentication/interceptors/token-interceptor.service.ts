import { Injectable, Injector } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { Observable } from 'rxjs/Observable';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class TokenInterceptorService {

  private oidcSecurityService: OidcSecurityService;

  constructor(
    private injector: Injector
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Using the injector to reference the OidcSecurityService
    // will resolved the cyclic dependency
    if (this.oidcSecurityService === undefined) {
      this.oidcSecurityService = this.injector.get(OidcSecurityService);
    }

    if (this.oidcSecurityService !== undefined) {
      const token = this.oidcSecurityService.getToken();
      if (token !== '') {
        const tokenValue = `Bearer ${token}`;
        request = request.clone({
          setHeaders: {
            Authorization: tokenValue
          }
        });
      }

    } else {
      console.log('OidcSecurityService undefined: NO auth header!');
    }

    return next.handle(request);
  }

}
