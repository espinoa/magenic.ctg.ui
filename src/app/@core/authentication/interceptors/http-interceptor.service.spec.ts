import { TestBed, inject } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';
import { AuthService } from '@core/authentication/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { OidcSecurityService, OidcConfigService } from 'angular-auth-oidc-client';
import { OidcSecurityServiceStub } from '@core/identityServer/oids-security.service.stub';

describe('HttpInterceptorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                HttpInterceptorService,
                AuthService,
                {
                    provide: OidcSecurityService, use: OidcSecurityServiceStub
                },
                OidcConfigService
            ]
        });
    });

    it('should be created', inject([HttpInterceptorService], (service: HttpInterceptorService) => {
        expect(service).toBeTruthy();
    }));
});
