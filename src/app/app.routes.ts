import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [IntroGuard, LoginGuard] // ✅ aquí usamos ambos guards
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then(m => m.IntroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  }
];



