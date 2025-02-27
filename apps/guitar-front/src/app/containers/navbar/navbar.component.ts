import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@guitar/auth';
import { filter, Subscription, tap } from 'rxjs';

@Component({
  selector: 'guitar-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  loggedIn$ = this.authService.authStatus$;
  user$ = this.authService.user$;

  private loggedInSub!: Subscription;

  ngOnInit() {
    this.loggedInSub = this.loggedIn$
      .pipe(
        filter((loggedIn) => loggedIn && !this.authService.profileLoaded()),
        tap(() => {
          this.authService.fetchUserProfile().subscribe();
        })
      )
      .subscribe();
  }
  ngOnDestroy() {
    if (this.loggedInSub) {
      this.loggedInSub.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }
}
