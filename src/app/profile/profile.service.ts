import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable()
export class ProfileService {

    constructor(private _httpClient: HttpClient) { }

    // Temporary for demo only
    public getClaims() {
        return this._httpClient.get(`${environment.tcsApi.url}/Identity`).map(result => result);
    }
}
