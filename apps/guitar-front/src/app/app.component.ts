import { Component } from '@angular/core';
import { AuthService } from '@guitar/auth';

@Component({
    selector: 'guitar-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.handleAuthCallback();
  }
}
