import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChordComponent } from './components/chord/chord.component';
import { ChartComponent } from './components/chart/chart.component';
import { IncludesStringPipe } from './pipes/includes-string.pipe';
import { MetronomeComponent } from './components/metronome/metronome.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChordComponent,
    ChartComponent,
    MetronomeComponent,
    IncludesStringPipe
  ],
  exports: [
    ChordComponent,
    ChartComponent,
    MetronomeComponent,
  ],
})
export class GuitarToolsModule {}
