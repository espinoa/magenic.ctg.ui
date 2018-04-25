import { Observable } from 'rxjs';

export class LoaderServiceStub {

    loaderState = Observable.create(o => { o.complete });

    show(): void {

    }

    hide(): void {

    }

    forceHide(): void {

    }

    getCount(): number {
        return 1;
    }
}
