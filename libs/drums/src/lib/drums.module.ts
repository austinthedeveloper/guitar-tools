import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrumConfigComponent } from './components/drum-config/drum-config.component';
import { WebAudioModule } from '@ng-web-apis/audio/';
import { FrequencyPipeModule } from '@ng-web-apis/midi';
import { DrumTabComponent } from './components/drum-tab/drum-tab.component';
import { DrumFormConfigComponent } from './components/drum-form-config/drum-form-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    WebAudioModule,
    FrequencyPipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DrumConfigComponent,
    DrumTabComponent,
    DrumFormConfigComponent,
  ],
  exports: [DrumConfigComponent, DrumTabComponent, DrumFormConfigComponent],
})
export class DrumsModule {}
