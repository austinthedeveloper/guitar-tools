import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChordComponent } from './components/chord/chord.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChordComponent,
    ChartComponent
  ],
  exports: [
    ChordComponent,
    ChartComponent
  ],
})
export class GuitarToolsModule {}
