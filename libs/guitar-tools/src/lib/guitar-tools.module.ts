import { NgModule } from '@angular/core';

import { ChartTabComponent } from './components/chart-tab/chart-tab.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChordComponent } from './components/chord/chord.component';
import { FretboardComponent } from './components/fretboard/fretboard.component';
import { MetronomeComponent } from './components/metronome/metronome.component';
import { GUITAR_QUIZ_COMPONENTS } from './components/quiz';
import { TraditionalTabComponent } from './components/traditional-tab/traditional-tab.component';
import { ScaleReferenceComponent } from './components/scale-reference/scale-reference.component';
import { GUITAR_TOOLS_PIPES } from './pipes';

@NgModule({
  imports: [
    ChartComponent,
    ChartTabComponent,
    ChordComponent,
    FretboardComponent,
    MetronomeComponent,
    TraditionalTabComponent,
    ScaleReferenceComponent,
    ...GUITAR_QUIZ_COMPONENTS,
    ...GUITAR_TOOLS_PIPES,
  ],
  exports: [
    ChartComponent,
    ChartTabComponent,
    ChordComponent,
    FretboardComponent,
    MetronomeComponent,
    TraditionalTabComponent,
    ...GUITAR_QUIZ_COMPONENTS,
    ScaleReferenceComponent,
  ],
})
export class GuitarToolsModule {}
