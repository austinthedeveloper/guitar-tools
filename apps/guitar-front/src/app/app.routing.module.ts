import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { OptionsComponent } from './containers/options/options.component';
import { QuizComponent } from './containers/quiz/quiz.component';
import { MetronomeComponent } from './containers/metronome/metronome.component';
import { AuthCallbackComponent, AuthGuard } from '@guitar/auth';
import { SetupComponent } from './containers/setup/setup.component';
import { LoginComponent } from './containers/login/login.component';

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
  { path: 'setup', component: SetupComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
