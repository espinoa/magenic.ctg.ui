import { Employee } from './../../entities/employee';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { ApiBaseService } from './../api-base.service';
import { Observable } from 'rxjs/Observable';
import { Training } from '@shared/entities/training';
import 'rxjs/add/operator/map';

@Injectable()
export class TrainingService extends ApiBaseService {
    constructor(@Inject(Http) http: Http) {
        super(http);
    }

    get(trainingId): Observable<Training> {
        return this.http.get('../../../../assets/data/trainings.json').map((response) => {

            // TODO remove this once the API is live
            var data = JSON.parse(response.text(), this.jsonParseReviver)
            var training: Training;

            return data.find(x => {
                if (x.TrainingId == trainingId) {
                    return Training.fromJS(x);
                }
            });
    
        });
    }

    getEmployeeTrainings(employeeId: string): Observable<Training[]> {
        const _url = this.baseUrl + './api/';
        const _content = '';

        // Temporary Implementation: Get data from json file.
        return this.http.get('../../../../assets/data/trainings.json').map((response) => {
            return this.processGetEmployeeTrainings(response);
        });

        // TODO: Uncomment this code when the api endpoint is already available
        // return this.http.request(this.sanitizeUrl(_url), {
        //     body: _content,
        //     method: 'get',
        // }).map((response) => {
        //     return this.processGetEmployeeTrainings(response);
        // });
        // .catch((response: any, caught: any) => {
        //     if (response instanceof Response) {
        //         try {
        //             return <Observable<any>><any>Observable.throw(response);
        //         } catch (e) {
        //             return <Observable<Training[]>><any>Observable.throw(e);
        //         }
        //     } else {
        //         return <Observable<Training[]>><any>Observable.throw(response);
        //     }
        // });
    }

    protected processGetEmployeeTrainings(response: Response): Training[] {
        const responseText = response.text();
        const status = response.status;

        if (status === 200) {
            let result200: Training[] = null;
            const resultData200 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (const item of resultData200) {
                    result200.push(Training.fromJS(item));
                }
            }
            return result200;
        } else if (status !== 200 && status !== 204) {
            this.handleError(response);
        }
        return null;
    }
}
