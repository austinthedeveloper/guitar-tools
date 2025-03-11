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
import {
  getAmpsResolver,
  getPairingResolver,
  getPairingsResolver,
  getPedalboardsResolver,
  getPedalsResolver,
} from '@guitar/setup';
import { SetupPairingDetailComponent } from './containers/setup/components/setup-pairing-detail/setup-pairing-detail.component';
import { SetupDashboardComponent } from './containers/setup/components/setup-dashboard/setup-dashboard.component';

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
  {
    path: 'setup',
    component: SetupDashboardComponent,
    canActivate: [AuthGuard],
    resolve: [
      getPedalsResolver,
      getPedalboardsResolver,
      getPairingsResolver,
      getAmpsResolver,
    ],
  },
  {
    path: 'setup/pairing/new',
    component: SetupPairingDetailComponent,
    resolve: [getPedalboardsResolver, getAmpsResolver],
  },  
  {
    path: 'setup/pairing/:pairingId',
    component: SetupPairingDetailComponent,
    resolve: [getPairingResolver, getPedalboardsResolver, getAmpsResolver],
  },
  { path: 'login', component: LoginComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
