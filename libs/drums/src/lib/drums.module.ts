import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrumConfigComponent } from './components/drum-config/drum-config.component';
import { WebAudioModule } from '@ng-web-apis/audio/';
import { FrequencyPipeModule } from '@ng-web-apis/midi';
import { DrumTabComponent } from './components/drum-tab/drum-tab.component';
import { DrumFormConfigComponent } from './components/drum-form-config/drum-form-config.component';
@NgModule({
  imports: [CommonModule, WebAudioModule, FrequencyPipeModule],
  declarations: [
    DrumConfigComponent,
    DrumTabComponent,
    DrumFormConfigComponent,
  ],
  exports: [DrumConfigComponent, DrumTabComponent, DrumFormConfigComponent],
})
export class DrumsModule {}
