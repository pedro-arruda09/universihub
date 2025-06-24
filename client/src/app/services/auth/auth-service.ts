import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { LoginDto } from '../../dto/auth/login.dto';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  token: string;
  user_id: number;
  user_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  register(userData: CreateUserDto) {
    return this.httpClient.post('/users', userData);
  }

  login(credentials: LoginDto) {
    return this.httpClient.post<LoginResponse>('/auth', credentials).pipe(
      tap((response) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.user_id.toString());
          localStorage.setItem('user_name', response.user_name);
        }
      })
    );
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }

    return null;
  }
}
