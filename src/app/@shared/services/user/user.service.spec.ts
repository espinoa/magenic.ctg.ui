/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { EmployeeService } from './../employee/employee.service';
import { OidcSecurityService, OidcConfigService, AuthModule} from 'angular-auth-oidc-client';
import { loadConfig } from '@core/identityServer/identity-server.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { OidcSecurityServiceStub } from '@core/identityServer/oids-security.service.stub';
import { Http, ConnectionBackend, RequestOptions } from '@angular/http';

describe('Service: User.service.ts', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                AuthModule.forRoot(),
                RouterTestingModule
              ],
            providers: [
                UserService,
                EmployeeService,
                {
                    provide: OidcSecurityService , use: OidcSecurityServiceStub
                },
                Http,
                ConnectionBackend,
        RequestOptions
            ]
        });
    });

    xit('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
