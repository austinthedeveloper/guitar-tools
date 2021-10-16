import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChordComponent } from './components/chord/chord.component';
import { ChartComponent } from './components/chart/chart.component';
import { MetronomeComponent } from './components/metronome/metronome.component';
import { IncludesStringPipe,
    ActivePressesPipe,
    IsMutedPipe,
    StringTypePipe,
    TabStringTypePipe} from './pipes';
import { ChartTabComponent } from './components/chart-tab/chart-tab.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChordComponent,
    ChartComponent,
    MetronomeComponent,
    ChartTabComponent,
    IncludesStringPipe,
    ActivePressesPipe,
    IsMutedPipe,
    StringTypePipe,
    TabStringTypePipe
  ],
  exports: [
    ChordComponent,
    ChartComponent,
    MetronomeComponent,
    ChartTabComponent,
  ],
})
export class GuitarToolsModule {}
