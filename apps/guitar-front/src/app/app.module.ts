import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DrumsModule } from '@guitar/drums';
import { GuitarToolsModule } from '@guitar/guitar-tools';

import { AppComponent } from './app.component';
import { APP_COMPONENTS } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ...APP_COMPONENTS],
  imports: [
    BrowserModule,
    GuitarToolsModule,
    FormsModule,
    ReactiveFormsModule,
    DrumsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
