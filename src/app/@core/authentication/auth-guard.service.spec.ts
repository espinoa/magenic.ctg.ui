
import { TestBed, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { OidcSecurityServiceStub } from '@core/identityServer/oids-security.service.stub';
import { OidcSecurityService, OidcConfigService, AuthModule } from 'angular-auth-oidc-client';
import { AuthService } from '@core/authentication/auth.service';

describe('AuthGuardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                // AuthModule.forRoot(),
                RouterTestingModule
            ],
            providers: [
                AuthGuardService,
                AuthService,
                { provide: OidcSecurityService, use: OidcSecurityServiceStub }
            ]
        });
    });

    it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
        expect(service).toBeTruthy();
    }));

});
