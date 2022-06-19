import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FORM_LIB_COMPONENTS } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [...FORM_LIB_COMPONENTS],
  exports: [...FORM_LIB_COMPONENTS],
})
export class GuitarFormsModule {}
