import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {GuitarToolsModule} from '@guitar/guitar-tools';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GuitarToolsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
