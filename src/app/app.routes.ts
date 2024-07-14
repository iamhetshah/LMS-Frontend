import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { inject } from '@angular/core';
import { UserService } from './services/user/user.service';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { LibrarianDashboardComponent } from './components/librarian-dashboard/librarian-dashboard.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { ProfileComponent } from './components/profile/profile.component';

const LoginGuard: CanMatchFn = (rou, seg) => {
  const user = inject(UserService);
  const router = inject(Router);
  return !user.isAuthenticated()
    ? true
    : new RedirectCommand(router.parseUrl('/'));
};

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
    canMatch: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canMatch: [LoginGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'explore',
    component: AllBooksComponent,
  },
  {
    path: 'librarian/dashboard',
    component: LibrarianDashboardComponent,
    canMatch: [
      () => {
        const user = inject(UserService);
        return user.isAuthenticated() && user._user.role === 'LIBRARIAN';
      },
    ],
  },
  {
    path: 'book/:isbn',
    component: BookPageComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canMatch: [
      () => {
        const user = inject(UserService);
        return user.isAuthenticated();
      },
    ],
  },
];
