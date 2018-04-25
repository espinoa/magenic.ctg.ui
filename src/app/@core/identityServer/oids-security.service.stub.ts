import { Observable } from 'rxjs/Observable';

export const OidcSecurityServiceStub = {
    // getUserData(): Observable<any> {
    //     return Observable.of(null);
    // }

    getIsAuthorized(): Observable<any> {
        return Observable.of(null);
    },
    onAuthorizationResult(): Observable<any> {
        return Observable.of('some value');
    },
    authorize: function() {},
    getUserData: true,
    moduleSetup: true
};
