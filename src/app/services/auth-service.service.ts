import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, UserModel } from '../interfaces/auth-response';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ServerDetails } from '../configs/server-details';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = ServerDetails.serverIP;
  private authSubject = new BehaviorSubject<AuthResponse | null>(null);

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user).pipe(
      tap((res) => {
        this.storeAuthData(res);
      })
    );
  }

  // Login user
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        this.storeAuthData(res);
      })
    );
  }

  // Get authenticated user
  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/me`);
  }

  // Logout user
  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('auth');
        this.authSubject.next(null);
      })
    );
  }

  // Refresh token
  refreshToken(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/refresh`, {}).pipe(
      tap((res) => {
        let authData = this.getAuthData();
        if (authData) {
          authData.token = res.token;
          this.storeAuthData(authData);
        }
      })
    );
  }

  // Store authentication data
  private storeAuthData(authData: AuthResponse): void {
    localStorage.setItem('auth', JSON.stringify(authData));
    this.authSubject.next(authData);
  }

  // Retrieve authentication data
  getAuthData(): AuthResponse | null {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth) : null;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.getAuthData() !== null;
  }
}
