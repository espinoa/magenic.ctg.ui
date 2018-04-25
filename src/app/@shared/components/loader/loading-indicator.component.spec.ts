import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorComponent } from './loading-indicator.component';
import { LoaderService } from '@core/loader/loading-indicator.service';
import { LoaderServiceStub } from '@core/loader/loading-indicator.service.stub';
import { LoaderState } from '@shared/interface/loader';

// Manual Imports
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoadingIndicatorComponent', () => {
    let component: LoadingIndicatorComponent;
    let fixture: ComponentFixture<LoadingIndicatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [LoadingIndicatorComponent],
            providers: [ {provide: LoaderService, useClass: LoaderServiceStub} ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingIndicatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
