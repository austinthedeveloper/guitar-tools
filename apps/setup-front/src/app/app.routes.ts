import { Route } from '@angular/router';
import { AuthCallbackComponent, AuthGuard } from '@guitar/auth';
import { LoginComponent } from './containers/login/login.component';
import {
  getPedalsResolver,
  getPedalboardsResolver,
  getPairingsResolver,
  getAmpsResolver,
  getPairingResolver,
} from '@guitar/setup';
import { SetupDashboardComponent } from './containers/setup/components/setup-dashboard/setup-dashboard.component';
import { SetupPairingDetailComponent } from './containers/setup/components/setup-pairing-detail/setup-pairing-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: SetupDashboardComponent,
    canActivate: [AuthGuard],
    resolve: [
      getPedalsResolver,
      getPedalboardsResolver,
      getPairingsResolver,
      getAmpsResolver,
    ],
  },
  { path: 'login', component: LoginComponent },
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
  { path: 'auth/callback', component: AuthCallbackComponent },
];
