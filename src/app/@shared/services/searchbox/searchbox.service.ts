import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';

import { Training } from './../../entities/training';

@Injectable()
export class SearchboxService {
  private keyword: string;

  constructor() { }

  searchTrainingsByStatus(keyword: string, trainings: Training[]): Training[] {
    const searchResult: Training[] = [];
    trainings
      .filter(t => t.name.toLowerCase().includes(keyword))
      .map(function(ft) {
        searchResult.push(ft);
      });

    return searchResult;
  }

  setKeyword(keyword: string) {
    this.keyword = keyword;
  }
  getKeyword(): Observable<string> {
    return Observable.of(this.keyword);
  }

}
