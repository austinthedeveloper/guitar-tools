import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
    selector: 'auth-callback',
    template: `<p>Logging you in...</p>`,
    standalone: false
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      if (token) {
        this.authService.storeToken(token);
        this.authService.fetchUserProfile().subscribe(() => {
          this.router.navigate(['/']); // Redirect after login
        });
      } else {
        this.router.navigate(['/login']); // Fallback if no token is found
      }
    });
  }
}
