import { Employee } from './../../entities/employee';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { ApiBaseService } from './../api-base.service';
import { Observable } from 'rxjs/Observable';
import { Lesson } from '@shared/entities/lesson';
import 'rxjs/add/operator/map';

@Injectable()
export class LessonService extends ApiBaseService {
    constructor(@Inject(Http) http: Http) {
        super(http);
    }

    get(): Observable<Lesson[]> {
        return this.http.get('../../../../assets/data/lessons.json').map((response) => {

            // TODO remove this once the API is live
            var data = JSON.parse(response.text(), this.jsonParseReviver)
            var lessons: Lesson[];
            if (data && data.constructor === Array) {
                lessons = [];
                for (const item of data) {
                    lessons.push(Lesson.fromJS(item));
                }
            }
            return lessons;
   
        });
   
    }
}
