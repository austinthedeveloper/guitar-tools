import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AUTH_COMPONENTS } from './components';

@NgModule({ declarations: [...AUTH_COMPONENTS],
    exports: [...AUTH_COMPONENTS], imports: [CommonModule, RouterModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule {}
