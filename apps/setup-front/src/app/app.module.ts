import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LoginComponent } from './containers/login/login.component';
import { SetupDashboardComponent } from './containers/setup/components/setup-dashboard/setup-dashboard.component';
import { SetupPairingDetailComponent } from './containers/setup/components/setup-pairing-detail/setup-pairing-detail.component';
import { SetupComponent } from './containers/setup/setup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AuthInterceptor, AuthModule } from '@guitar/auth';
import { MetronomeComponent } from '@guitar/metronome';
import { SetupModule } from '@guitar/setup';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
const APP_CONTAINERS = [
  LoginComponent,
  SetupComponent,
  SetupDashboardComponent,
  SetupPairingDetailComponent,
];

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ...APP_CONTAINERS],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgbModule,
    MetronomeComponent,
    AuthModule,
    NgbModalModule,
    SetupModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    { provide: 'environment', useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
