import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  sidebarActions = [
    {
      label: 'Home',
      icon: 'home',
      route: '/home',
    },
    {
      label: 'Enrollments',
      icon: 'school',
      route: '/enrollments',
    },
    {
      label: 'Courses',
      icon: 'book',
      route: '/courses',
    },
    {
      label: 'Profile',
      icon: 'person',
      route: '/profile',
    }
  ]

  router = inject(Router);

  currentRoute: string = this.router.url;

  navigateTo(route: string) {
    this.currentRoute = route;
    // this.router.navigate([route]);
  }
}
