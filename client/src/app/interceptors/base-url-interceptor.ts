import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const baseUrl = environment.apiUrl;
  const url = req.url.startsWith('http') ? req.url : `${baseUrl}${req.url}`;

  const token = authService.getToken();
  let headers = req.headers;

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return next(req.clone({ url, headers }));
};
