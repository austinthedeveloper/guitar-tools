import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAmpComponent } from './components/create-amp/create-amp.component';
import { CreatePedalComponent } from './components/create-pedal/create-pedal.component';
import { CreatePedalboardComponent } from './components/create-pedalboard/create-pedalboard.component';
import { CreatePairingComponent } from './components/create-pairing/create-pairing.component';
import { CreateAmpUsageComponent } from './components/create-amp-usage/create-amp-usage.component';
import { CreatePedalUsageComponent } from './components/create-pedal-usage/create-pedal-usage.component';
import { PedalDisplayComponent } from './components/display/pedal-display/pedal-display.component';
import { AmpDisplayComponent } from './components/display/amp-display/amp-display.component';
import { PedalboardDisplayComponent } from './components/display/pedalboard-display/pedalboard-display.component';
import { PairingDisplayComponent } from './components/display/pairing-display/pairing-display.component';
import { KnobRotateDirective } from './directives/knob-rotate/knob-rotate.directive';
import { PedalColorPipe } from './pipes/pedal-color/pedal-color.pipe';
import { KnobDisplayComponent } from './components/display/knob-display/knob-display.component';
import { GuitarFormsModule } from '@guitar/forms';
import { EditSetupComponent } from './components/edit-setup/edit-setup.component';

const components = [
  CreateAmpComponent,
  CreatePedalComponent,
  CreatePedalboardComponent,
  CreatePairingComponent,
  CreateAmpUsageComponent,
  CreatePedalUsageComponent,
  EditSetupComponent,
  // display
  PedalDisplayComponent,
  AmpDisplayComponent,
  PedalboardDisplayComponent,
  PairingDisplayComponent,
  KnobDisplayComponent,
];
const directives = [KnobRotateDirective];
const pipes = [PedalColorPipe];
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, GuitarFormsModule],
  declarations: [...components, ...directives, ...pipes],
  exports: [...components, ...directives, ...pipes],
})
export class SetupModule {}
