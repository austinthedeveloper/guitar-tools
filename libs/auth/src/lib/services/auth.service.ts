import { UserProfile, EnvInterface } from '@guitar/interfaces';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${this.env.api}/auth`;
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  // Observable for authentication status
  private userSubject = new BehaviorSubject<UserProfile>(null);
  user$ = this.userSubject.asObservable();
  private authStatusSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  authStatus$ = this.authStatusSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('environment') private env: EnvInterface
  ) {}

  /** Redirect to Google login */
  loginWithGoogle(): void {
    window.location.href = `${this.apiUrl}/google`;
  }

  /** Handle authentication response from backend */
  handleAuthCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      this.storeToken(token);
      this.fetchUserProfile().subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  /** Fetch the logged-in user */
  fetchUserProfile() {
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`).pipe(
      tap((user) => {
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.userSubject.next(user);
        this.setAuthStatus(true);
      })
    );
  }

  private setAuthStatus(newStatus: boolean): void {
    if (this.authStatusSubject.value !== newStatus) {
      this.authStatusSubject.next(newStatus);
    }
  }

  /** Logout */
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe(() => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      this.authStatusSubject.next(false);
      this.router.navigate(['/login']);
    });
  }

  /** Store the JWT token */
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authStatusSubject.next(true);
  }

  /** Retrieve JWT token */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /** Check if user is authenticated */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  profileLoaded() {
    return !!this.userSubject.value;
  }
}
