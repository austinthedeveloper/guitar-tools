import { inject } from '@angular/core';

import { AuthService } from '../services';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

// TODO: Convert to function
// export const AuthGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   if (authService.isAuthenticated()) {
//     return true;
//   }
//   router.navigate(['/login']);
//   return false;
// };
