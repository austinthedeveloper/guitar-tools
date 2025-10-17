import { ChordQuizComponent } from './chord-quiz/chord-quiz.component';
import { ModeNameQuizComponent } from './mode-name-quiz/mode-name-quiz.component';
import { ModeOrderingQuizComponent } from './mode-ordering-quiz/mode-ordering-quiz.component';
import { ModeQuizComponent } from './mode-quiz/mode-quiz.component';
import { QuizTotalsComponent } from './quiz-totals/quiz-totals.component';
import { RelativeMajorQuizComponent } from './relative-major-quiz/relative-major-quiz.component';
import { RelativeMinorQuizComponent } from './relative-minor-quiz/relative-minor-quiz.component';
import { ScaleQuizComponent } from './scale-quiz/scale-quiz.component';
import { SpecificNoteComponent } from './specific-note/specific-note.component';
import { TriadNoteOrderComponent } from './triad-note-order/triad-note-order.component';

export * from './chord-quiz/chord-quiz.component';
export * from './fretboard-quiz/fretboard-quiz.component';
export * from './mode-name-quiz/mode-name-quiz.component';
export * from './mode-ordering-quiz/mode-ordering-quiz.component';
export * from './mode-quiz/mode-quiz.component';
export * from './quiz-base/quiz-base.component';
export * from './quiz-totals/quiz-totals.component';
export * from './relative-major-quiz/relative-major-quiz.component';
export * from './relative-minor-quiz/relative-minor-quiz.component';
export * from './scale-quiz/scale-quiz.component';
export * from './specific-note/specific-note.component';
export * from './triad-note-order/triad-note-order.component';

export const GUITAR_QUIZ_COMPONENTS = [
  ChordQuizComponent,
  ModeNameQuizComponent,
  ModeQuizComponent,
  RelativeMinorQuizComponent,
  ScaleQuizComponent,
  QuizTotalsComponent,
  ModeOrderingQuizComponent,
  RelativeMajorQuizComponent,
  SpecificNoteComponent,
  TriadNoteOrderComponent,
];
