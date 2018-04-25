import { Employee } from './../../entities/employee';
import { Http, Response } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { ApiBaseService } from './../api-base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService extends ApiBaseService {
    constructor( @Inject(Http) http: Http) {
        super(http);
    }

    getEmployeeByEmail(email: string): Observable<Employee> {
        const _url = this.baseProfileServiceUrl + '/api/Employee/GetEmployeeByEmail?email=' + email;
        const _content = '';

        return this.http.get(this.sanitizeUrl(_url))
            .map((response) => {
                return this.processGetEmployee(response);
            })
            .catch((response: any, caught: any) => {
                if (response instanceof Response) {
                    try {
                        return <Observable<any>><any>Observable.throw(response);
                    } catch (e) {
                        return <Observable<Employee>><any>Observable.throw(e);
                    }
                } else {
                    return <Observable<Employee>><any>Observable.throw(response);
                }
            });
    }

    protected processGetEmployee(response: Response): Employee {
        const responseText = response.text();
        const status = response.status;

        if (status === 200) {
            let result200: any = null;
            const resultData200 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
            result200 = resultData200 ? Employee.fromJS(resultData200.data[0]) : null;
            return result200;
        } else if (status !== 200 && status !== 204) {
            this.handleError(response);
        }
        return null;
    }
}
