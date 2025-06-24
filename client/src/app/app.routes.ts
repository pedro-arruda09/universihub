import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Home } from './components/home/home';


export const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'home',
    component: Home
  }
];
