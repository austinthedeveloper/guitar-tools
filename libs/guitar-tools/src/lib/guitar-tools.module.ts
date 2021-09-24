import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChordComponent } from './components/chord/chord.component';
import { ChartComponent } from './components/chart/chart.component';
import { MetronomeComponent } from './components/metronome/metronome.component';
import { ActivePressesPipe, IncludesStringPipe} from './pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChordComponent,
    ChartComponent,
    MetronomeComponent,
    IncludesStringPipe,
    ActivePressesPipe
  ],
  exports: [
    ChordComponent,
    ChartComponent,
    MetronomeComponent,
  ],
})
export class GuitarToolsModule {}
