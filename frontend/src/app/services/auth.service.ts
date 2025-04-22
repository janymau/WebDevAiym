// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/login/';
  private baseUrl = 'http://127.0.0.1:8000/api/';
  private apiRegisterUrl = 'http://127.0.0.1:8000/api/register/';
  private loginStatus = new BehaviorSubject<boolean>(this.checkToken());
  loginStatus$ = this.loginStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }).pipe(
      tap((res: any) => {
        this.saveTokens(res.access, res.refresh);
        this.loginStatus.next(true);
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(this.apiRegisterUrl, data);
  }

  logout(): void {
    this.removeTokens();
    this.loginStatus.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.checkToken();
  }

  private checkToken(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch (e) {
      return false;
    }
  }

  private saveTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  public removeTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
    public getRefreshToken(): string | null {
        return localStorage.getItem('refresh_token');
    }

    public refreshToken(): Observable<any> {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) return throwError(() => 'No refresh token');
        return this.http.post(`${this.baseUrl}token/refresh/`, { refresh }).pipe(
          tap((res: any) => this.saveTokens(res.access, res.refresh)),
          catchError(err => {
            this.logout(); // Также очистит токены
            return throwError(() => err);
          })
        );
      }
}
