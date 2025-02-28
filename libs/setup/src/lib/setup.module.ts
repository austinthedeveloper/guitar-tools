import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiTestComponent } from './components/api-test.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ApiTestComponent],
  exports: [ApiTestComponent],
})
export class SetupModule {}
