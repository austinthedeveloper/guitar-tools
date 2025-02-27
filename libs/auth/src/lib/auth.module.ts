import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AUTH_COMPONENTS } from './components';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  declarations: [...AUTH_COMPONENTS],
  exports: [...AUTH_COMPONENTS],
})
export class AuthModule {}
