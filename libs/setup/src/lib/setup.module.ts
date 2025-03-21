import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAmpComponent } from './components/create-amp/create-amp.component';
import { CreatePedalComponent } from './components/create-pedal/create-pedal.component';
import { CreatePedalboardComponent } from './components/create-pedalboard/create-pedalboard.component';
import { PedalDisplayComponent } from './components/display/pedal-display/pedal-display.component';
import { AmpDisplayComponent } from './components/display/amp-display/amp-display.component';
import { PedalboardDisplayComponent } from './components/display/pedalboard-display/pedalboard-display.component';
import { PairingDisplayComponent } from './components/display/pairing-display/pairing-display.component';
import { KnobRotateDirective } from './directives/knob-rotate/knob-rotate.directive';
import { PedalColorPipe } from './pipes/pedal-color/pedal-color.pipe';
import { KnobDisplayComponent } from './components/display/knob-display/knob-display.component';
import { GuitarFormsModule } from '@guitar/forms';
import { EditSetupComponent } from './components/edit-setup/edit-setup.component';
import { PedalToggleComponent } from './components/display/pedal-toggle/pedal-toggle.component';
import { AiSettingsModalComponent } from './components/ai-settings-modal/ai-settings-modal.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AmpModalComponent } from './components/amp-modal/amp-modal.component';
import { PedalModalComponent } from './components/pedal-modal/pedal-modal.component';
import { PedalboardModalComponent } from './components/pedalboard-modal/pedalboard-modal.component';
import { PedalsOnPipe } from './pipes/pedals-on/pedals-on.pipe';
import { MatIconModule } from '@angular/material/icon';
import { GetTextColorPipe } from './pipes/get-text-color/get-text-color.pipe';
import { DarkenColorPipe } from './pipes/darken-color/darken-color.pipe';

const components = [
  CreateAmpComponent,
  CreatePedalComponent,
  CreatePedalboardComponent,
  EditSetupComponent,
  // display
  PedalDisplayComponent,
  AmpDisplayComponent,
  PedalboardDisplayComponent,
  PairingDisplayComponent,
  KnobDisplayComponent,
  PedalToggleComponent,
  // Modals
  AiSettingsModalComponent,
  AmpModalComponent,
  PedalModalComponent,
  PedalboardModalComponent,
];
const directives = [KnobRotateDirective];
const pipes = [PedalColorPipe, PedalsOnPipe, GetTextColorPipe, DarkenColorPipe];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GuitarFormsModule,
    NgbModalModule,
    NgbDropdownModule,
    MatIconModule,
  ],
  declarations: [...components, ...directives, ...pipes],
  exports: [...components, ...directives, ...pipes],
})
export class SetupModule {}
