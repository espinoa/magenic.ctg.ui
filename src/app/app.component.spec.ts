import { OidcSecurityService, OidcConfigService, AuthorizationResult, AuthModule } from 'angular-auth-oidc-client';
import { AuthService } from '@core/authentication/auth.service';
import { loadConfig } from '@core/identityServer/identity-server.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, DebugElement } from '@angular/core';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let authService: AuthService;
  let oidcSecurityService: OidcSecurityService;

  beforeEach(async(() => {
    // oidcSecurityServiceStub = {
    //   getToken: () => {}
    // };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AuthModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        OidcSecurityService,
        OidcConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: loadConfig,
          deps: [OidcConfigService],
          multi: true,
        },
        AuthService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    authService = TestBed.get(AuthService);
    oidcSecurityService = TestBed.get(OidcSecurityService);
  });

  xit('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
  xit('should create the auth service', async(() => {
    expect(authService).toBeTruthy();
  }));
  xit('should create the oidcSecurity service', async(() => {
    expect(oidcSecurityService).toBeTruthy();
  }));


  describe('logOut()', () => {
    beforeEach(() => {
      let store = {};

      const mockLocalStorage = {
        getItem: (key: string): string => {
          return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
          store[key] = `${value}`;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        }
      };

      spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
      spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
      spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
      spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    });

    xit('should clear browser localstorage', async(() => {
      authService.setRedirectUrl('demo');
      authService.removeRedirectUrl();
      expect(authService.getRedirectUrl()).toBe(null);
    }));

  });
});

