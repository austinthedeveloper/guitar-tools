import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiTestComponent } from './components/api-test/api-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAmpComponent } from './components/create-amp/create-amp.component';
import { CreatePedalComponent } from './components/create-pedal/create-pedal.component';
import { CreatePedalboardComponent } from './components/create-pedalboard/create-pedalboard.component';
import { CreatePairingComponent } from './components/create-pairing/create-pairing.component';

const components = [
  ApiTestComponent,
  CreateAmpComponent,
  CreatePedalComponent,
  CreatePedalboardComponent,
  CreatePairingComponent,
];
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...components],
  exports: [...components],
})
export class SetupModule {}
