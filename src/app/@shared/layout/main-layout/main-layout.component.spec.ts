import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { UserServiceStub } from '@shared/services/user/user.service.stub';
import { UserService } from '@shared/services/user/user.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { OidcSecurityServiceStub } from '@core/identityServer/oids-security.service.stub';
import { of } from 'rxjs/observable/of';

describe('MainLayoutComponent', () => {
   let component: MainLayoutComponent;
   let fixture: ComponentFixture<MainLayoutComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         schemas: [CUSTOM_ELEMENTS_SCHEMA],
         declarations: [MainLayoutComponent],
         providers: [
            {
               provide: UserService, use: UserServiceStub
            },
            {
               provide: OidcSecurityService, use: OidcSecurityServiceStub
            }
         ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(MainLayoutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   xit('should create', () => {
      expect(component).toBeTruthy();
   });
});
