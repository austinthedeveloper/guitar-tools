import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { AppRoutingModule } from './app/app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthModule, AuthInterceptor } from '@guitar/auth';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SetupModule } from '@guitar/setup';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      BrowserAnimationsModule,
      NgbModule,
      NgbModalModule,
      AuthModule,
      SetupModule
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    { provide: 'environment', useValue: environment },
  ],
}).catch((err) => console.error(err));
