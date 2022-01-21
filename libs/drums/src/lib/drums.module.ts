import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrumConfigComponent } from './components/drum-config/drum-config.component';
import { WebAudioModule } from '@ng-web-apis/audio/';
import { FrequencyPipeModule } from '@ng-web-apis/midi';
@NgModule({
  imports: [CommonModule, WebAudioModule, FrequencyPipeModule],
  declarations: [DrumConfigComponent],
  exports: [DrumConfigComponent],
})
export class DrumsModule {}
