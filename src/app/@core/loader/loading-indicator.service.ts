import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { LoaderState } from '@shared/interface/loader';

@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject
        .asObservable()
        .debounce(val => {
            if (val.show) {
                return Observable.timer(this.delayBeforeShow).first();
            } else {
                return Observable.timer(0).first();
            }
        });

    private counter: number = 0;
    public delayBeforeShow: number = 0;

    constructor() { }

    //emits true to show spinner on the state observable in the component class
    public show(): void {
        this.counter++;
        //console.log('LoaderService.show(), count=' + this.counter);
        this.loaderSubject.next(<LoaderState>{ show: true });
    }

    //emits false to show spinner on the state observable in the component class
    public hide(): void {
        if (this.counter > 0) {
            this.counter--;
        }
        //console.log('LoaderService.hide(), count=' + this.counter);
        if (this.counter <= 0) {
            this.counter = 0;
            this.loaderSubject.next(<LoaderState>{ show: false });
        }
    }

    //emits false to show spinner on the state observable in the component class
    public forceHide(): void {
        this.counter = 0;
        //console.log('LoaderService.forceHide(), count=' + this.counter);
        this.loaderSubject.next(<LoaderState>{ show: false });
    }

    public getCount(): number {
        return this.counter;
    }
}
