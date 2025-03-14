import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { MetronomeComponent } from './containers/metronome/metronome.component';
import { OptionsComponent } from './containers/options/options.component';
import { QuizComponent } from './containers/quiz/quiz.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'options',
    component: OptionsComponent,
  },
  {
    path: 'metronome',
    component: MetronomeComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
