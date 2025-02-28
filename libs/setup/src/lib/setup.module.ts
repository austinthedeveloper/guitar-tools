import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAmpComponent } from './components/form/create-amp/create-amp.component';
import { CreatePedalComponent } from './components/form/create-pedal/create-pedal.component';
import { CreatePedalboardComponent } from './components/form/create-pedalboard/create-pedalboard.component';
import { CreatePairingComponent } from './components/form/create-pairing/create-pairing.component';
import { CreateAmpUsageComponent } from './components/form/create-amp-usage/create-amp-usage.component';
import { CreatePedalUsageComponent } from './components/form/create-pedal-usage/create-pedal-usage.component';

const components = [
  CreateAmpComponent,
  CreatePedalComponent,
  CreatePedalboardComponent,
  CreatePairingComponent,
  CreateAmpUsageComponent,
  CreatePedalUsageComponent,
];
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...components],
  exports: [...components],
})
export class SetupModule {}
