import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '../auth';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth-service';
import { LoginDto } from '../../../dto/auth/login.dto';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, Auth, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  router = inject(Router);
  authService = inject(AuthService);

  loginForm!: FormGroup<LoginForm>;

  constructor() {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    return this.authService.login(this.loginForm.value as LoginDto).subscribe({
      next: (response) => this.router.navigate(['/home']),
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please try again.');
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
