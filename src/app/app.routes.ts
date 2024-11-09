import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AccountListComponent } from './client/account-list/account-list.component';
import { authGuard } from './service/auth.guard';
import { AccountComponent } from './client/account/account.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: AccountListComponent },
      { path: ':id', component: AccountComponent },
    ]
  },
];

export const routingComponents = [];
