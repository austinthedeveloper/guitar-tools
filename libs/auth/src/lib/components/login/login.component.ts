import { Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
    selector: 'auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
