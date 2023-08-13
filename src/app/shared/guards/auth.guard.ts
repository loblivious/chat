import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map, tap } from 'rxjs';
import { AuthService } from '../data-access/auth.service';

export function canActivateAuthenticated(): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const navControl = inject(NavController);
    return authService.user$.pipe(
      map((user) => !!user),
      tap((canActivate) => {
        if (!canActivate) {
          navControl.navigateRoot('/login');
        }
      })
    );
  };
}
