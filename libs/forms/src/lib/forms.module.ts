import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FORM_LIB_COMPONENTS } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  declarations: [...FORM_LIB_COMPONENTS],
  exports: [...FORM_LIB_COMPONENTS],
})
export class GuitarFormsModule {}
