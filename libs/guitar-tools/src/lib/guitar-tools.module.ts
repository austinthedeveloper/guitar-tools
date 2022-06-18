import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartTabComponent } from './components/chart-tab/chart-tab.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChordComponent } from './components/chord/chord.component';
import { FretboardComponent } from './components/fretboard/fretboard.component';
import { MetronomeComponent } from './components/metronome/metronome.component';
import { GUITAR_QUIZ_COMPONENTS } from './components/quiz';
import { GUITAR_TOOLS_PIPES } from './pipes';
import { SpecificNoteComponent } from './components/quiz/specific-note/specific-note.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatSelectModule,
  ],
  declarations: [
    ChartComponent,
    ChartTabComponent,
    ChordComponent,
    FretboardComponent,
    MetronomeComponent,
    ...GUITAR_QUIZ_COMPONENTS,
    ...GUITAR_TOOLS_PIPES,
    SpecificNoteComponent,
  ],
  exports: [
    ChartComponent,
    ChartTabComponent,
    ChordComponent,
    FretboardComponent,
    MetronomeComponent,
    ...GUITAR_QUIZ_COMPONENTS,
  ],
})
export class GuitarToolsModule {}
