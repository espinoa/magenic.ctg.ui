import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';

export class ApiBaseService {
    protected http: Http = null;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    protected get baseUrl(): string {
        return environment.appUrl;
    }
    protected get baseProfileServiceUrl(): string {
        return environment.tcsApi.profileServiceUrl;
    }

    constructor(http: Http) {
        this.http = http;
    }

    protected handleError(error: Response | any): string {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return errMsg;
    }

    // remove the last character of the url if it is an '&' to prevent sending a nameless parameter to the api.
    protected sanitizeUrl(url: string): string {
        let sanitizedUrl: string;

        if (url.charAt(url.length - 1) === '&') {
            sanitizedUrl = url.substr(0, url.length - 1);
        } else {
            sanitizedUrl = url;
        }
        return sanitizedUrl;
    }
}
