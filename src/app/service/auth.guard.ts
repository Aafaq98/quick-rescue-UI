import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    // Get the Router service using Angular's inject() function
    const router = inject(Router);

    // Check if the token exists in localStorage
    const userToken = localStorage.getItem('auth');
  
    // If the token exists, allow navigation
    if (userToken) {
      return true;
    } else {
      // If the token does not exist, redirect to the login page
      router.navigate(['/login']);
      return false;
    }
};
