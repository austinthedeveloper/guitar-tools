import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuitarToolsModule } from '@guitar/guitar-tools';

import { AppComponent } from './app.component';
import { APP_COMPONENTS } from './components';

@NgModule({
  declarations: [AppComponent, ...APP_COMPONENTS],
  imports: [
    BrowserModule,
    GuitarToolsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
