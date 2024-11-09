import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AccountListComponent } from './client/account-list/account-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'client',
    component: ClientComponent,
    // children: [
    //   { path: '', component: AccountListComponent },
    // ]
    // canActivate: [
    //   () => {
    //     const authService = inject(AuthService);
    //     return authService.isLoggedIn() ? true : '/login';
    //   },
    // ],
  },
];

export const routingComponents = [];
