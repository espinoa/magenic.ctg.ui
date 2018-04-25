// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@shared/shared.module';
import { IdentityServerModule } from '@core/identityServer/identity-server.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

// Services
import { AuthGuardService } from '@core/authentication/auth-guard.service';
import { AuthService } from '@core/authentication/auth.service';
import { LoaderService } from '@core/loader/loading-indicator.service';



@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    IdentityServerModule,
    AppRoutingModule,
    SharedModule,
    NoopAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
