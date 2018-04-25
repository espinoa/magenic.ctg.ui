import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Auth Oidc
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';

import { environment } from '@environments/environment';

import { HttpInterceptorService } from '@core/authentication/interceptors/http-interceptor.service';
import { TokenInterceptorService } from '@core/authentication/interceptors/token-interceptor.service';

export function loadConfig(oidcConfigService: OidcConfigService) {
  console.log('APP_INITIALIZER STARTING', environment.authServer.url);
  return () => oidcConfigService.load_using_stsServer(environment.authServer.url);
}

@NgModule({
  imports: [
    HttpClientModule,
    AuthModule.forRoot(),
  ],
  declarations: [],
  providers: [
    OidcSecurityService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ]
})
export class IdentityServerModule {

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private oidcConfigService: OidcConfigService
  ) {

    this.oidcConfigService.onConfigurationLoaded.subscribe(() => {

      const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
      openIDImplicitFlowConfiguration.stsServer = environment.authServer.url;
      openIDImplicitFlowConfiguration.redirect_url = environment.openIdConfig.redirect_url;

      openIDImplicitFlowConfiguration.client_id = environment.authServer.client_id;
      openIDImplicitFlowConfiguration.response_type = environment.authServer.response_type;
      openIDImplicitFlowConfiguration.scope = environment.authServer.scope;
      openIDImplicitFlowConfiguration.post_logout_redirect_uri = environment.openIdConfig.post_logout_redirect_uri;
      openIDImplicitFlowConfiguration.start_checksession = environment.openIdConfig.start_checksession;
      openIDImplicitFlowConfiguration.silent_renew = environment.openIdConfig.silent_renew;
      openIDImplicitFlowConfiguration.post_login_route = environment.openIdConfig.post_login_route;
      // HTTP 403
      openIDImplicitFlowConfiguration.forbidden_route = environment.openIdConfig.forbidden_route;
      // HTTP 401
      openIDImplicitFlowConfiguration.unauthorized_route = environment.openIdConfig.unauthorized_route;
      openIDImplicitFlowConfiguration.log_console_warning_active = environment.openIdConfig.log_console_warning_active;
      openIDImplicitFlowConfiguration.log_console_debug_active = environment.openIdConfig.log_console_debug_active;
      // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
      // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
      openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds =
        environment.openIdConfig.max_id_token_iat_offset_allowed_in_seconds;

      const authWellKnownEndpoints = new AuthWellKnownEndpoints();
      authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);

      this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, authWellKnownEndpoints);

    });

  }
}
