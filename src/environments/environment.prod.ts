export const environment = {
  production: true,
  appUrl: 'http://tcs-project.azurewebsites.net/',
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
    redirect_url: '',
    post_login_route: `/postlogin`,
    forbidden_route: '/forbidden',
    unauthorized_route: '/unauthorize',
    silent_renew: false,
    log_console_warning_active: true,
    log_console_debug_active: true,
    post_logout_redirect_uri: ``,
    start_checksession: false,
    max_id_token_iat_offset_allowed_in_seconds: 10
  }
};
