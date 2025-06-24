import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../enums/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [MatIconModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {
  Role = Role;
  infoByRole = {
    [Role.STUDENT]: {
      text: 'Manage your university life with Universihub, the ultimate platform for students',
      img: 'student.png'
    },
    [Role.PROFESSOR]: {
      text: 'Streamline your teaching experience with Universihub, the platform designed for professors',
      img: 'professor.png'
    },
    [Role.ADMIN]: {
      text: 'Efficiently manage your university with Universihub, the all-in-one platform for administrators',
      img: 'admin.png'
    }
  }
  currentRole: Role = Role.STUDENT;
  descriptionText: string = this.infoByRole[this.currentRole]?.text || '';
  cardImgSrc: string = this.infoByRole[this.currentRole]?.img || '';

  router = inject(Router);

  toggleRole(role: Role): void {
    this.descriptionText = this.infoByRole[role]?.text || '';
    this.cardImgSrc = this.infoByRole[role]?.img || '';

    this.currentRole = role;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login'], { queryParams: { role: this.currentRole } });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register'], { queryParams: { role: this.currentRole } });
  }
}
