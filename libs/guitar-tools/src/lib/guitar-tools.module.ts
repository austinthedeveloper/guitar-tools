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
import { ModeQuizComponent } from './components/mode-quiz/mode-quiz.component';
import { ModeNameQuizComponent } from './components/mode-name-quiz/mode-name-quiz.component';
import { RelativeMinorQuizComponent } from './components/relative-minor-quiz/relative-minor-quiz.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ActivePressesPipe,
    ChartComponent,
    ChartTabComponent,
    ChordComponent,
    ChordQuizComponent,
    FretboardComponent,
    FretboardQuizComponent,
    FretDotPipe,
    IncludesStringPipe,
    IsMutedPipe,
    MetronomeComponent,
    ModeNameQuizComponent,
    ModeQuizComponent,
    QuizTotalsComponent,
    RelativeMinorQuizComponent,
    ScaleQuizComponent,
    StringTypePipe,
    TabStringTypePipe,
  ],
  exports: [
    ChartComponent,
    ChartTabComponent,
    ChordComponent,
    ChordQuizComponent,
    FretboardComponent,
    MetronomeComponent,
    ModeNameQuizComponent,
    ModeQuizComponent,
    RelativeMinorQuizComponent,
    ScaleQuizComponent,
  ],
})
export class GuitarToolsModule {}
