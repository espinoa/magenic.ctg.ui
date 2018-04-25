import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from '@core/loader/loading-indicator.service';
import { LoaderState } from '@shared/interface/loader';



@Component({
    selector: 'app-loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.less'],
    animations: [
        trigger('loading', [
            state('in', style({ opacity: 1 })),
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms ease-out')
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class LoadingIndicatorComponent implements OnInit {

    show: boolean = false;
    private subscription: Subscription;

    constructor(private loaderService: LoaderService) { }

    ngOnInit() {

        //observable that will hold the state of the spinner
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
