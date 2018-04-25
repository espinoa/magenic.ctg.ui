import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Skill } from '@shared/entities/skill';
import { Observable } from 'rxjs/Observable';
import { ApiBaseService } from '@shared/services/api-base.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SkillsService  extends ApiBaseService {
    constructor(@Inject(Http) http: Http) {
        super(http);
    }

    getSkills(employeeId: string): Observable<Skill[]> {
        const _url = this.baseProfileServiceUrl + '/api/Employee/GetEmployeeSkillsById?id=' + employeeId;
        const userSkillset: Skill[] = [];

        return this.http.get(this.sanitizeUrl(_url))
            .map((response) => {
                return this.processEmployeeSkills(response);
            })
            .catch((response: any, caught: any) => {
                if (response instanceof Response) {
                    try {
                        return <Observable<any>><any>Observable.throw(response);
                    } catch (e) {
                        return <Observable<Skill>><any>Observable.throw(e);
                    }
                } else {
                    return <Observable<Skill>><any>Observable.throw(response);
                }
            });
    }

    protected processEmployeeSkills(response: Response): Skill[] {
      const responseText = response.text();
      const status = response.status;

      if (status === 200) {
          let result200: any = null;
          const resultData200 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
          result200 = resultData200 ? this.convertDataToSkills(resultData200.data[0]) : null;
          return result200;
      } else if (status !== 200 && status !== 204) {
          this.handleError(response);
      }
      return null;
  }

  protected convertDataToSkills(data: any): Skill[] {
    const userSkills: Skill[] = [];
    data.forEach(element => {
      userSkills.push(Skill.fromJS(element));
    });
    return userSkills;
  }
}
