import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const myauthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'] as string;
  const role = localStorage.getItem('role');
  if (authService.isAuthenticated() && role) {
    if(role == expectedRole){
      return true
    }
  }else{
    router.navigate(['/notauthorized']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};
