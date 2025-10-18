import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@guitar/auth';
import { NavbarComponent } from './containers/navbar/navbar.component';

@Component({
  selector: 'guitar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.handleAuthCallback();
  }
}
