import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNgxMask } from 'ngx-mask';
import { Major } from '../../../interfaces/major/major';
import { CommonModule } from '@angular/common';
import { Role } from '../../../enums/role';
import { CreateUserDto } from '../../../dto/user/create-user.dto';
import { Auth } from '../auth';

interface RegisterForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirm_password: FormControl<string | null>;
  birth_date: FormControl<Date | null>;
  address?: FormControl<string | null>;
  major_id: FormControl<number | null>;
}

@Component({
  selector: 'app-register',
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Auth,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  registerForm!: FormGroup<RegisterForm>;
  majors: Major[] = [];
  role: Role = Role.STUDENT;

  constructor() {
    this.registerForm = new FormGroup<RegisterForm>({
      name: new FormControl<string | null>('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm_password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      birth_date: new FormControl<Date | null>(null, [Validators.required]),
      address: new FormControl<string | null>(''),
      major_id: new FormControl<number | null>(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const roleParam = params.get('role');
      if (roleParam && Object.values(Role).includes(roleParam as Role)) {
        this.role = roleParam as Role;
      }
    });
    // this.courseService.findAll().subscribe({
    //   next: (majors) => (this.majors = majors),
    //   error: (error) =>
    //     alert('Failed to load majors. Please try again later.'),
    // });
  }

  submit() {
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirm_password
    ) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const { confirm_password, ...formValue } = this.registerForm.value;
    const userData = {
      ...formValue,
      major_id: Number(formValue.major_id),
      birth_date: formValue.birth_date?.toISOString(),
      role: this.role,
    } as CreateUserDto;

    this.authService.register(userData).subscribe({
      next: (response) => this.router.navigate(['/login']),
      error: (error) => alert('Registration failed. Please try again.'),
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  trackByMajorId(index: number, major: Major): number {
    return major.id;
  }

  onDateChange(event: any): void {
    const date = new Date(event.value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    this.registerForm.patchValue({
      birth_date: new Date(`${year}-${month}-${day}`),
    });
  }
}
