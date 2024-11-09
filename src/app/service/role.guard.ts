import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserRole } from '../models/models';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles: UserRole[] = route.data['roles'] || [];
  const userRole = authService.getRole();
  if (userRole && requiredRoles.includes(userRole)) {
    return true;
  } else {
    router.navigate(['NotFound']);
    return false;
  }
  // return true;
};
