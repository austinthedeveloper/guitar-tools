import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuitarToolsModule } from '@guitar/guitar-tools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { APP_COMPONENTS } from './components';
import { APP_CONTAINERS } from './containers';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MetronomeComponent } from '@guitar/metronome';
import { environment } from '../environments/environment';
import { EnvInterface } from '@guitar/interfaces';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor, AuthModule } from '@guitar/auth';
import { SetupModule } from '@guitar/setup';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, ...APP_COMPONENTS, ...APP_CONTAINERS],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    GuitarToolsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    NgbModule,
    MetronomeComponent,
    AuthModule,
    NgbModalModule,
    SetupModule,
  ],
  providers: [
    { provide: 'environment', useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
