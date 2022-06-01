import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChordComponent } from './components/chord/chord.component';
import { ChartComponent } from './components/chart/chart.component';
import { MetronomeComponent } from './components/metronome/metronome.component';
import {
  IncludesStringPipe,
  ActivePressesPipe,
  IsMutedPipe,
  StringTypePipe,
  TabStringTypePipe,
  FretDotPipe,
} from './pipes';
import { ChartTabComponent } from './components/chart-tab/chart-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FretboardComponent } from './components/fretboard/fretboard.component';
import { ChordQuizComponent } from './components/chord-quiz/chord-quiz.component';
import { FretboardQuizComponent } from './components/fretboard-quiz/fretboard-quiz.component';
import { QuizTotalsComponent } from './components/quiz-totals/quiz-totals.component';
import { ScaleQuizComponent } from './components/scale-quiz/scale-quiz.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ChordComponent,
    ChartComponent,
    MetronomeComponent,
    ChartTabComponent,
    FretboardComponent,
    IncludesStringPipe,
    ActivePressesPipe,
    IsMutedPipe,
    StringTypePipe,
    TabStringTypePipe,
    FretDotPipe,
    ChordQuizComponent,
    FretboardQuizComponent,
    QuizTotalsComponent,
    ScaleQuizComponent,
  ],
  exports: [
    ChordComponent,
    ChartComponent,
    MetronomeComponent,
    ChartTabComponent,
    FretboardComponent,
    ChordQuizComponent,
    ScaleQuizComponent,
  ],
})
export class GuitarToolsModule {}
