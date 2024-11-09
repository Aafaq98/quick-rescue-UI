import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AccountListComponent } from './client/account-list/account-list.component';
import { authGuard } from './service/auth.guard';
import { AccountComponent } from './client/account/account.component';
import { roleGuard } from './service/role.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: AccountListComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['ADMIN'],
        },
      },
      {
        path: ':id',
        component: AccountComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['ADMIN', 'CONTACT'],
        },
      },
    ],
  },
  {
    path: '**',  // The wildcard route
    component: NotFoundComponent  // Display a "Not Found" page for undefined routes
  }
];

export const routingComponents = [];
