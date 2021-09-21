import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChordComponent } from './components/chord/chord.component';
import { ChartComponent } from './components/chart/chart.component';
import { IncludesStringPipe } from './pipes/includes-string.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChordComponent,
    ChartComponent,
    IncludesStringPipe
  ],
  exports: [
    ChordComponent,
    ChartComponent
  ],
})
export class GuitarToolsModule {}
