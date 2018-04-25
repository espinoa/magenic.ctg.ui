// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const appUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  appUrl: appUrl,
  tcsApi: {
    url: 'http://localhost:5001',
    profileServiceUrl: 'http://localhost:50155'
  },
  authServer: {
    url: 'http://tcsauthserver20180423080225.azurewebsites.net/',
    client_id: 'TCS_Client',
    scope: 'openid profile TCS_Api',
    response_type: 'id_token token',
  },
  openIdConfig: {
    redirect_url: `${appUrl}/dashboard/profile`,
    post_login_route: `/dashboard/profile`,
    forbidden_route: '/forbidden',
    unauthorized_route: '/unauthorized',
    silent_renew: false,
    log_console_warning_active: false,
    log_console_debug_active: false,
    post_logout_redirect_uri: `${appUrl}/logout-page`,
    start_checksession: false,
    max_id_token_iat_offset_allowed_in_seconds: 20
  }
};
